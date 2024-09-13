function generatePassword() {
    const length = document.getElementById('length').value;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;
  
    const errorMessage = document.getElementById('error-message');
  
    if (length > 20 || length < 6) {
      showToast('add between 6 and 20', 'error');
      return;
    }
  
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  
    let availableChars = '';
    if (includeUppercase) availableChars += uppercaseLetters;
    if (includeLowercase) availableChars += lowercaseLetters;
    if (includeNumbers) availableChars += numbers;
    if (includeSymbols) availableChars += symbols;
  
    if (availableChars === '') {
      showToast('select at least something to generate password', 'error');
      return;
    }
  
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      password += availableChars[randomIndex];
    }
  
    document.getElementById('password').value = password;
    showToast('password generated', 'success');
  }
  
  function copyPassword() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    document.execCommand('copy');
    showToast('password copied to clipboard', 'success');
  }
  
  function showToast(message, type) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.classList.add('toast');
  
    if (type === 'error') {
      toast.style.border = '1px solid red';
    }
  
    toast.innerHTML = `
      <span>${message}</span>
      <button class="toast-close" onclick="closeToast(this)">×</button>
    `;
  
    toastContainer.appendChild(toast);
  
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        toast.remove();
      }, 500);
    }, 5000);
  }
  
  function closeToast(button) {
    const toast = button.parentElement;
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 500);
  }
  