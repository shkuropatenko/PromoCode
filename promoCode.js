const bonusAccount = (promoCode) => {
  if (typeof promoCode !== 'number') {
    throw new Error('Promo Code should be a number!');
  }

  // PromoCode to Array
  const arr = [];
  while(promoCode) {
    arr.unshift(promoCode % 10);
    promoCode = promoCode / 10 | 0;
  }

  if (arr.length !== 8) {
    throw new Error('Promo code must contain 8 digits!');
  }

  // Difference between multiples and non-multiples
  const bonusSmall = (arr) => {
    let oddNumber = 0;
    let evenNumber = 0;
    
    arr.forEach(num => {
      if(num % 2) {
        oddNumber = oddNumber + num;
      } else {
        evenNumber = evenNumber + num;
      }
    });

    return evenNumber > oddNumber;
  }
  const bonus100 = bonusSmall(arr);

  const pairFirstArr = [];
  const pairSecondArr = [];

  const bonusMiddle = (arr) => {
    let remainderArray = [];
    let copyPromoCode = [];
    let numbersBetweenArrays = [];
    let counter = 0;

    // First pair of non-multiple numbers
    arr.reduce((previousValue, currentValue, index) => {
      copyPromoCode.push(currentValue);
      if (previousValue % 2 && currentValue % 2 && pairFirstArr.length < 2) {
        counter = index + 1;
        pairFirstArr.push(previousValue, currentValue);
      }

      return previousValue = currentValue;
      }, 0);

    remainderArray = copyPromoCode.splice(counter);
    
    // Second pair of non-multiple numbers
    remainderArray.reduce((previousValue, currentValue, index) => {
        if (previousValue % 2 && currentValue % 2 && pairSecondArr.length < 2) {
          pairSecondArr.push(previousValue, currentValue);
          counter = index - 1;
        }

      return previousValue = currentValue;
    }, 0);

    // Array between pairs of non-multiple numbers
    numbersBetweenArrays = remainderArray.slice(0, counter);
    // Checking numbers for multiplicity in an array
    const numbersBetween = numbersBetweenArrays.every(num => num % 2 === 0);

    if (numbersBetweenArrays.length && numbersBetween) {
      return true;
    } 

    return false;
  }
  const bonus1000 = bonusMiddle(arr);
  
  // Checking numbers in ascending order in two arrays
  const bonusLarge = (num1, num2) => {
    if(num1[0] < num1[1] && num2[0] < num2[1]) {
      return true;
    }
    
    return false;
  }
  const bonus2000 = bonusLarge(pairFirstArr, pairSecondArr);
  
  // Return result
  if (bonus1000) {
    if (bonus2000) {
      return 2000;
    }
    return 1000;
  } else if (bonus100) {
    return 100;
  } else {
    return 0;
  }
}
console.log(bonusAccount(84533920), '84533920');
console.log(bonusAccount(48183276), '48183276');
console.log(bonusAccount(73289388), '73289388');
console.log(bonusAccount(37283988), '37283988');
