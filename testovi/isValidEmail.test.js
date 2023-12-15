const { isValidEmail } = require('../sign_up'); // Import the actual implementation

describe('isValidEmail', () => {
  it('should return true for a valid email', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user123@gmail.com')).toBe(true);
  });

  it('should return false for an invalid email', () => {
    expect(isValidEmail('invalidemail')).toBe(false);
    expect(isValidEmail('user.hr')).toBe(false);
  });

  it('should return true for a valid but unconventional email', () => {
    // Test with the email "s@c.b"
    expect(isValidEmail('s@c.b')).toBe(true);
  });
});
