export const styles = {
  container:
    'min-h-screen bg-gradient-to-br from-blue-900 via-indigo-950 to-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter',
  content:
    'bg-white rounded-3xl shadow-2xl flex flex-col lg:flex-row w-full max-w-7xl overflow-hidden transition-transform duration-300 hover:scale-[1.005]',
  brandColumn:
    'lg:w-1/2 p-8 sm:p-12 flex flex-col items-center justify-center text-white text-center bg-gradient-to-br from-green-600 via-blue-700 to-yellow-500 rounded-3xl lg:rounded-r-none',
  logo: 'w-48 h-48 sm:w-56 sm:h-56 object-contain mb-8 rounded-full shadow-lg border-4 border-white transform transition-transform duration-300 hover:rotate-6 hover:scale-105',
  title: 'text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg',
  subtitle: 'text-lg sm:text-xl opacity-95 drop-shadow-md',
  formColumn: 'lg:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-center',
  tabs: 'flex justify-center mb-10',
  tabButton:
    'px-8 py-4 text-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg',
  activeTab: 'bg-green-600 text-white',
  inactiveTab: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
};
