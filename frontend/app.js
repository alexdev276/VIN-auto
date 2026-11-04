let vinInp = document.getElementById('vin');
let checkBtn = document.getElementById('check-button');
let result = document.getElementById('res');

function validateVin() {

};

checkBtn.addEventListener('click', function(){
    const prohibited = ["I", "O", "Q", " ", "-"];
    let vin = vinInp.value.trim().toUpperCase();
    for (let i of prohibited){
        if (vin.includes(i)){
            alert("VIN содержит запрещенные символы");
            break;
        }
    }
    if (vin.length != 17){
        alert("VIN не соотвтествует по длине");
    }

    console.log(vin);
    console.log("---------");
});

