export const styles = {
  form: 'flex flex-col space-y-8',
  title: 'text-4xl font-bold text-gray-800 text-center mb-4',
  error: 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative',
  input:
    'w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-500 focus:border-transparent transition duration-200 text-lg',
  passwordToggle:
    'absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700',
  forgotPassword: 'text-lg text-green-600 hover:underline self-end font-medium',
  submitButton:
    'w-full bg-green-600 text-white py-4 rounded-xl font-bold text-2xl hover:bg-green-700 transition duration-300 shadow-xl flex items-center justify-center transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
  separator: 'relative flex items-center py-6',
  separatorLine: 'flex-grow border-t border-gray-300',
  separatorText: 'flex-shrink mx-6 text-gray-500 text-lg font-medium',
  socialButtons: 'flex flex-col sm:flex-row gap-4',
  socialButton:
    'flex-1 flex items-center justify-center gap-3 p-4 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition duration-200 shadow-sm transform hover:scale-105 active:scale-95 text-lg font-bold',
  registerText: 'text-center text-lg text-gray-600 mt-6',
  registerLink: 'text-green-600 hover:underline font-bold',
};
