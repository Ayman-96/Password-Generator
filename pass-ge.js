let range = 8;
document.querySelector('.input-range').addEventListener('input',() =>  {
  range = document.querySelector('.input-range').value;
  document.querySelector('.range-number').innerHTML = range;
});

 // increase decrease buttons functionality
document.getElementById('increase').addEventListener('click',() => {
  if(range<32) { 
    range++;
    document.querySelector('.input-range').value = range;
    document.querySelector('.range-number').innerHTML = range;
  }
});    ;
document.getElementById('decrease').addEventListener('click',() => {
  if(range>8) {
    range--;
    document.querySelector('.input-range').value = range;
    document.querySelector('.range-number').innerHTML = range;
  }
});

// Generate password button functionality
document.querySelector('.generate-btn').addEventListener('click', () => {
  const uppercaseCheck = document.getElementById('uppercase').checked;
  const numberCheck = document.getElementById('numbers').checked;
  const symbolsCheck = document.getElementById('symbols').checked;
  const duplicateCheck = document.getElementById('duplicate').checked;

  generatePassword(uppercaseCheck, numberCheck, symbolsCheck, duplicateCheck); // call function and give the checkbox values as arguments
});

  // Copy to clipboard functionality API
document.querySelector('.copy-btn').addEventListener('click', () => {
  const password = document.querySelector('.pass-box').innerText;
  navigator.clipboard.writeText(password)
    .then(() => { // display message on successful copy
      const msgBox = document.querySelector('.copy-message');
      msgBox.innerText = `Password copied to clipboard!`;
      msgBox.style.color = '#4c6444';
      msgBox.style.fontWeight = 'bold';
      setTimeout(() => { msgBox.innerText = ''; }, 2000); // Hide after 2 seconds
    })  
    .catch(() => {
      const msgBox = document.querySelector('.copy-message');
      msgBox.innerText = 'Failed to copy password.';
      msgBox.style.color = 'red';
      setTimeout(() => { msgBox.innerText = ''; }, 2000);
    });
});

function generatePassword(upp,num,sym,dup) {
  let password = '';  // should be inside the function to reset each time
  let strength = 0;
  if(range >= 12) { strength++; } 
  if(upp === true) { strength++; }
  if(num === true) { strength++; }
  if(sym === true) { strength++; }


  while(password.length < range) { // loop until password length is less than the desired range
    
    let alpha = 'abcdefghijklmnopqrstuvwxyz';
    let chooseRandomly = Math.floor(Math.random() * ( 26 - 0 ) + 0); // original function to choose random index
    let add = alpha.charAt(chooseRandomly);
    
    if(password.includes(add) && dup === false) { // check if character already exists in password and if duplicates are not allowed
      continue; // skip this iteration and try again
    }else 
      password += add;
    if(password.length >= range) { break;} // check if password length has reached the desired range to stop

    if(upp === true) {
      let alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let chooseRandomly = Math.floor(Math.random() * ( 26 - 0 ) + 0); // original function to choose random index
      let add = alpha.charAt(chooseRandomly);
      if(password.includes(add) && dup === false) { // check if character already exists in password and if duplicates are not allowed
        continue; // skip this iteration and try again
      }else 
        password += add;
      if(password.length >= range) { break;} // check if password length has reached the desired range to stop
    }
  
    if(num === true) {
      let numbers = '1234567890';
      let chooseRandomly = Math.random() * 10;
      let add = numbers.charAt(chooseRandomly);

      if(password.includes(add) && dup === false) {
        continue;
      }else
        password += add;
      if(password.length >= range) { break;}
    }
    if(sym === true) {
      let symbols = '!@#$%^&*_~-';
      let chooseRandomly = Math.floor(Math.random() * 11);
      let add = symbols.charAt(chooseRandomly);

      if(password.includes(add) && dup === false) {
        continue;
      }else
        password += add;
      if(password.length >= range) { break;}
      }
  }  // shuffle the password to avoid any patterns.
  password = password.split('').sort(() => Math.random() - 0.5).join('');
  document.querySelector('.pass-box').innerHTML = password;
  console.log(strength);
  // Update strength bar colors based on strength value
  document.getElementById('bar1').style.backgroundColor = '#d1d1d1';
  document.getElementById('bar2').style.backgroundColor = '#d1d1d1';
  document.getElementById('bar3').style.backgroundColor = '#d1d1d1';
  document.getElementById('bar4').style.backgroundColor = '#d1d1d1';
  if(strength === 1) {
    document.getElementById('bar1').style.backgroundColor = '#f64a4a';
  }else if(strength === 2) {
    document.getElementById('bar1').style.backgroundColor = '#f64a4a';
    document.getElementById('bar2').style.backgroundColor = '#f8cd65';
  }else if(strength === 3) {
    document.getElementById('bar1').style.backgroundColor = '#f64a4a';
    document.getElementById('bar2').style.backgroundColor = '#f8cd65';
    document.getElementById('bar3').style.backgroundColor = '#a4ffaf';
  }else if(strength === 4) {
    document.getElementById('bar1').style.backgroundColor = '#f64a4a';
    document.getElementById('bar2').style.backgroundColor = '#f8cd65';
    document.getElementById('bar3').style.backgroundColor = '#a4ffaf';
    document.getElementById('bar4').style.backgroundColor = '#4caf50';
  }
}
