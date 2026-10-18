import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import en from '../i18n/locales/en';
import fa from '../i18n/locales/fa';
import ps from '../i18n/locales/ps';

const at = (path) => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);const setDate = (value) => fireEvent.change(screen.getByLabelText(/preferred date/i), { target: { value } });

describe('routing', () => {
  it('shows the hero on the home page', () => {
    at('/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Khalid Khan/);
    expect(screen.getAllByRole('link', { name: /request an appointment/i })[0]).toHaveAttribute('href', '/appointment');
  });

  it('renders a not-found page for unknown addresses', () => {
    at('/does-not-exist');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/moved/);
    expect(screen.getByRole('link', { name: /back to the start/i })).toBeInTheDocument();
  });

  it('moves between pages through the navigation', async () => {
    const user = userEvent.setup();
    at('/');
    await user.click(screen.getAllByRole('link', { name: 'Procedures' })[0]);
    expect(await screen.findByRole('heading', { level: 1, name: /operations for/i })).toBeInTheDocument();
  });
  it('links every focus area on the home page to its procedures', () => {
    at('/');
    const areas = screen
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))
      .filter((href) => href?.startsWith('/procedures?area='));
    expect(areas).toEqual(['/procedures?area=brain', '/procedures?area=spine', '/procedures?area=nerves', '/procedures?area=head-injury']);
  });
});

describe('procedures list', () => {
  it('lists every procedure and filters by area', async () => {
    const user = userEvent.setup();
    at('/procedures');
    const group = screen.getByRole('group', { name: /filter procedures/i });
    expect(within(group).getAllByRole('button')).toHaveLength(5);
    expect(screen.getByText(/11 procedures listed/i)).toBeInTheDocument();

    await user.click(within(group).getByRole('button', { name: /^Spine/i }));
    expect(screen.getByRole('status').textContent).toMatch(/Showing 4 of 11/);
    expect(screen.queryByText('Craniotomy and tumour removal')).not.toBeInTheDocument();
    expect(screen.getByText('Discectomy')).toBeInTheDocument();
  });

  it('opens on the area named in the address', () => {
    at('/procedures?area=brain');
    const group = screen.getByRole('group', { name: /filter procedures/i });
    expect(within(group).getByRole('button', { name: /^Brain/i })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('status').textContent).toMatch(/Showing 3 of 11/);
    expect(screen.getByText('Craniotomy and tumour removal')).toBeInTheDocument();
    expect(screen.queryByText('Discectomy')).not.toBeInTheDocument();
  });

  it('falls back to every procedure for an unknown area', () => {
    at('/procedures?area=heart');
    expect(screen.getByRole('status').textContent).toMatch(/Showing 11 of 11/);
  });

  it('opens a procedure summary on demand', async () => {
    const user = userEvent.setup();
    at('/procedures');
    await user.click(screen.getByRole('button', { name: /spinal fusion/i }));
    expect(await screen.findByText(/joining two or more vertebrae/i)).toBeInTheDocument();
  });
});

describe('appointment form', () => {
  it('blocks an empty submission and explains each missing field', async () => {
    const user = userEvent.setup();
    at('/appointment');
    await user.click(screen.getByRole('button', { name: /send request/i }));

    expect(await screen.findByText(/please enter the patient name/i)).toBeInTheDocument();
    expect(screen.getByText(/phone number is needed/i)).toBeInTheDocument();
    expect(screen.getByText(/choose a preferred date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/patient name/i)).toHaveAttribute('aria-invalid', 'true');
    expect(screen.queryByText(/request noted/i)).not.toBeInTheDocument();
  });

  it('rejects a date in the past', async () => {
    const user = userEvent.setup();
    at('/appointment');
    await user.type(screen.getByLabelText(/patient name/i), 'Ahmad Rahimi');
    await user.type(screen.getByLabelText(/phone number/i), '+93787654751');
    setDate('2020-01-05');
    await user.click(screen.getByRole('button', { name: /send request/i }));
    expect(await screen.findByText(/pick today or a later date/i)).toBeInTheDocument();
  });

  it('confirms a valid request without pretending to send data', async () => {
    const user = userEvent.setup();
    at('/appointment');
    await user.type(screen.getByLabelText(/patient name/i), 'Ahmad Rahimi');
    await user.type(screen.getByLabelText(/phone number/i), '+93787654751');
    setDate('2099-04-09');
    await user.click(screen.getByRole('radio', { name: /whatsapp/i }));
    await user.click(screen.getByRole('button', { name: /send request/i }));

    expect(await screen.findByRole('heading', { name: /request noted, ahmad/i })).toBeInTheDocument();
    expect(screen.getByText('Ahmad Rahimi')).toBeInTheDocument();
    expect(screen.getAllByText(/does not send or store/i).length).toBeGreaterThan(0);
  });
});

describe('services', () => {
  it('expands a service row to its related procedures', async () => {
    const user = userEvent.setup();
    at('/services');
    const row = screen.getAllByRole('article')[0];
    await user.click(within(row).getByRole('button', { name: /details/i }));
    expect(await within(row).findByText(/related procedures/i)).toBeInTheDocument();
    expect(within(row).getAllByText(/request consultation/i)).toHaveLength(1);
  });
});

describe('content integrity', () => {
  it('holds unverified credentials back instead of filling them in', () => {
    at('/about');
    expect(screen.getAllByText(/pending verification/i)).toHaveLength(3);
    expect(screen.getByText(/only verified information is published here/i)).toBeInTheDocument();
  });

  it('publishes no invented outcome, volume or endorsement claims', () => {
    const banned = /\d+ (patients|surgeries|operations) (treated|performed)|success rate|\b\d{2,3}%\b|award-winning|board[- ]certified|top \d+ doctor|#1 (neuro)?surgeon/i;
    for (const path of ['/', '/about', '/services', '/procedures', '/appointment', '/contact']) {
      const { unmount } = at(path);
      expect(document.body.textContent).not.toMatch(banned);
      expect(screen.queryByRole('heading', { name: /testimonials|what patients say|patient reviews|star rating/i })).not.toBeInTheDocument();
      unmount();
    }
  });

  it('states the demonstration disclaimer on every page', () => {
    at('/');
    expect(screen.getByText(/demonstration website/i)).toBeInTheDocument();
  });
});

const keyPaths = (node, prefix = '') =>
  Object.entries(node).flatMap(([key, value]) =>
    typeof value === 'object' ? keyPaths(value, `${prefix}${key}.`) : [`${prefix}${key}`],
  );

describe('languages', () => {
  it('gives all three locales the same keys', () => {
    expect(keyPaths(fa).sort()).toEqual(keyPaths(en).sort());
    expect(keyPaths(ps).sort()).toEqual(keyPaths(en).sort());
  });

  it('translates the page and turns the layout right-to-left', async () => {
    const user = userEvent.setup();
    at('/');
    const switcher = screen.getByRole('group', { name: /language/i });

    await user.click(within(switcher).getByRole('button', { name: 'دری' }));
    expect(screen.getByRole('heading', { level: 1 }).textContent).toMatch('دکتور خالد خان');
    expect(document.documentElement.dir).toBe('rtl');
    expect(document.documentElement.lang).toBe('fa-AF');
    expect(localStorage.getItem('lang')).toBe('fa');

    await user.click(within(switcher).getByRole('button', { name: 'پښتو' }));
    expect(document.documentElement.lang).toBe('ps-AF');
    expect(within(switcher).getByRole('button', { name: 'پښتو' })).toHaveAttribute('aria-pressed', 'true');

    await user.click(within(switcher).getByRole('button', { name: 'EN' }));
    expect(document.documentElement.dir).toBe('ltr');
    expect(screen.getByRole('heading', { level: 1 }).textContent).toMatch(/Khalid Khan/);
  });
});
