let vinInp = document.getElementById('vin');
let checkBtn = document.getElementById('check-button');
let result = document.getElementById('res');

function validateVin() {

};

checkBtn.addEventListener('click', async function(){
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
        // result.textContent = vin;
        let response = await fetch(
            'http://127.0.0.1:8000/api/check',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    'vin': vin
                })
            }
        )
        let data = await response.json()
        result.textContent = data.message + ': ' + data.vin
    };
});

