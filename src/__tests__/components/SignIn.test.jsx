import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';

import { SignInContainer } from '../../components/SignIn';

const mockUser = {
  username: 'AzureDiamond',
  password: 'hunter2',
};

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();

      render(<SignInContainer onSubmit={onSubmit} />);

      const usernameInput = screen.getByPlaceholderText('Username');
      const passwordInput = screen.getByPlaceholderText('Password');
      const submitButton = screen.getByText('Sign in');

      fireEvent.changeText(usernameInput, mockUser.username);
      fireEvent.changeText(passwordInput, mockUser.password);

      expect(onSubmit).toHaveBeenCalledTimes(0);

      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);

        expect(onSubmit).toHaveBeenLastCalledWith(mockUser, expect.anything());
      });
    });
  });
});
