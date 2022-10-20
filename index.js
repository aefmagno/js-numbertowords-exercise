const ones = [
'zero', 'one', 'two', 'three', 'four', 'five',
'six', 'seven', 'eight', 'nine', 'ten',
];

const teens = [
, 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
'sixteen', 'seventeen', 'eighteen', 'nineteen',
];

const tens = [
, 'ten', 'twenty', 'thirty', 'forty',
'fifty', 'sixty', 'seventy', 'eighty', 'ninety',
];

const hundred = 'hundred';
const thousand = 'thousand';

const parseWords = function (num) {
const stringNum = num.toString();
let numLength = stringNum.length;

const arrNum = Array.from(stringNum);

let numToString = '';
let restString = '';

if (numLength > 3 && numLength % 3 > 0) { // 4 digit number
    let remainingWords = '';
    if (numLength % 3 === 1) {
    const [numA, ...rest] = arrNum;
    if (numA > 0) {
        numToString = `${ones[numA]} thousand `;
        restString = rest.join('');

        if (restString.charAt(0) == 0 && restString.charAt(1) == 0 && restString.charAt(2) == 0) { // 000
        return numToString;
        return numToString;
        } if (restString.charAt(0) == 0 && restString.charAt(1) == 0 && restString.charAt(2) > 0) { // 001
        remainingWords = numbersToWords(1, restString.charAt(2), true);    
        return numToString + remainingWords;
        } if (restString.charAt(0) == 0 && restString.charAt(1) > 0) { // 011
        remainingWords = numbersToWords(2, [restString.charAt(1), restString.charAt(2)].join(''), true); 
        return numToString + remainingWords; 
        } if (restString.charAt(0) > 0) { // 111
        remainingWords = numbersToWords(3, restString, true);  
        return numToString + remainingWords;
        }
    }
    } else if (numLength > 3 && numLength % 3 === 2) { // 5 digit number
    const [num1, num2, ...rest1] = arrNum;

    if (num1 > 0) {
        let firstHalfParse = '';
        let seconHalfParse = '';
        const firstHalf = [num1, num2].join('');
        const secondHalf = rest1.join('');
        firstHalfParse = `${numbersToWords(2, firstHalf)  } thousand `

        if (secondHalf.charAt(0) == 0 && secondHalf.charAt(1) == 0 && secondHalf.charAt(2) == 0) { // 000
        return firstHalfParse;
        } if (secondHalf.charAt(0) == 0 && secondHalf.charAt(1) == 0 && secondHalf.charAt(2) > 0) { // 001
        seconHalfParse = numbersToWords(1, secondHalf.charAt(2), true);    
        return firstHalfParse + seconHalfParse;
        } if (secondHalf.charAt(0) == 0 && secondHalf.charAt(1) > 0) { // 011
        seconHalfParse = numbersToWords(2, [secondHalf.charAt(1), secondHalf.charAt(2)].join(''), true); 
        return firstHalfParse + seconHalfParse;
        } if (secondHalf.charAt(0) > 0) { // 111
        seconHalfParse = numbersToWords(3, secondHalf, true);  
        return firstHalfParse + seconHalfParse;
        }
    }
    }
} else if (numLength === 6) { // 6 digit number
    const [num1, num2, num3, ...rest] = arrNum;
    let firstHalfParse = '';
    let seconHalfParse = '';
    const firstHalf = [num1, num2, num3].join('');
    const secondHalf = rest.join('');

    if (num1 > 0) { // check if first digit is not 0
    firstHalfParse = `${numbersToWords(3, firstHalf)} thousand `
    if (secondHalf.charAt(0) == 0 && secondHalf.charAt(1) == 0 && secondHalf.charAt(2) == 0) { // 000
        return firstHalfParse;
    } if (secondHalf.charAt(0) == 0 && secondHalf.charAt(1) == 0 && secondHalf.charAt(2) > 0) { // 001
        seconHalfParse = numbersToWords(1, secondHalf.charAt(2), true);    
        return firstHalfParse + seconHalfParse;
    } if (secondHalf.charAt(0) == 0 && secondHalf.charAt(1) > 0) { // 011
        seconHalfParse = numbersToWords(2, [secondHalf.charAt(1), secondHalf.charAt(2)].join(''), true); 
        return firstHalfParse + seconHalfParse;
    } if (secondHalf.charAt(0) > 0) { // 111
        seconHalfParse = numbersToWords(3, secondHalf, true);  
        return firstHalfParse + seconHalfParse;
    }
    }
} else if (numLength <= 3) { // hundred
    return numbersToWords(numLength, stringNum, false);
}
};

const numbersToWords = function (numLength, stringNum, check) {
if (numLength != null) {
    switch (numLength) {
    case 1:
        return ones[stringNum];

    case 2:
        if (stringNum.charAt(0) == 1) {
        if (stringNum.charAt(1) == 0) {
            return tens[1];
        }

        return teens[stringNum.charAt(1)];
        } if (stringNum.charAt(0) > 1 && stringNum.charAt(1) == 0) {
        return tens[stringNum.charAt(0)];
        }

        return [tens[stringNum.charAt(0)], ones[stringNum.charAt(1)]].join('');

    case 3:
        if (stringNum.charAt(0) == 0 && check == false) {
        return 'Invalid Input';
        }

        if (stringNum.charAt(1) == 0 && stringNum.charAt(2) == 0) { // 100 += 100
        return [ones[stringNum.charAt(0)], hundred].join(' ');
        } if (stringNum.charAt(1) == 0 && stringNum.charAt(2) > 0) { // 100 to 109
        return [ones[stringNum.charAt(0)], hundred, ones[stringNum.charAt(2)]].join(' ');
        } if (stringNum.charAt(1) == 1 && stringNum.charAt(2) == 0) { // 110
        return [ones[stringNum.charAt(0)], hundred, tens[1]].join(' ');
        } if (stringNum.charAt(1) > 1 && stringNum.charAt(2) == 0) { // 110 += 10
        return [ones[stringNum.charAt(0)], hundred, tens[stringNum.charAt(1)]].join(' ');
        } if (stringNum.charAt(1) == 1 && stringNum.charAt(2) > 0) { // 111 to 119
        return [ones[stringNum.charAt(0)], hundred, teens[stringNum.charAt(2)]].join(' ');
        } if (stringNum.charAt(1) > 0 && stringNum.charAt(2) > 0) { // 120 += 1
        return [ones[stringNum.charAt(0)], hundred, tens[stringNum.charAt(1)], ones[stringNum.charAt(2)]].join(' ');
        }
        break;

    default:
        return 'error';
    }
}
};

console.log(parseWords(0));
console.log(parseWords(101101));
console.log(parseWords(912915));
console.log(parseWords(999999));
console.log(parseWords(702608));
console.log(parseWords(111111));
console.log(parseWords(219348));
