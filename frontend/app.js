let vinInp = document.getElementById('vin');
let checkBtn = document.getElementById('check-button');
let result = document.getElementById('res');

function validateVin() {

};

checkBtn.addEventListener('click', function(){
    const prohibited = ["I", "O", "Q", " ", "-"];
    let vin = vinInp.value.trim().toUpperCase();
    let f = true;
    for (let i of prohibited){
        if (vin.includes(i)){
            result.textContent = "VIN содержит запрещенные символы";
            f = false;
            break;
        }
    };
    if (vin.length != 17){
        f = false;
        result.textContent = "VIN не соотвтествует по длине";
    };

    if (f){
        result.textContent = vin;
    };
});

