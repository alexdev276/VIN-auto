let vinInp = document.getElementById('vin');
let checkBtn = document.getElementById('check-button');
let result = document.getElementById('res');


checkBtn.addEventListener('click', async function(){
    result.textContent = "Ожидание....";
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
        );
        result.textContent = '';
        let data = await response.json();
        console.log(data);
        let app = document.querySelector('#res');
        //марка, модель
        let make = document.createElement("h2");
        make.textContent = data.make + " " + data.model + " " + data.trim;

        let list = document.createElement("ul");

        let year = document.createElement("li");
        year.textContent = "Год выпуска: " + data.year;
        let engine = document.createElement("li");
        engine.textContent = "Тип двигателя: " + data.engine_type;
        let transmission = document.createElement("li");
        transmission.textContent = "Коробка передач: " + data.transmission;
        let drive_type = document.createElement("li");
        drive_type.textContent = "Привод: " + data.drive_type;
        list.append(year, engine, transmission, drive_type);
        

        let compl = data.complaints;
        console.log(compl);

        let title = document.createElement("h3");
        title.textContent = "Жалобы";

        let list2 = document.createElement("ul");

        for (let i = 0; i < compl.length; i++){
            let el = document.createElement("li");

            let date_incident = document.createElement("p");
            date_incident.textContent = "Дата инцидента: " + compl[i].date_of_incident;

            let date_compl = document.createElement("p");
            date_compl.textContent = "Дата создания жалобы: " + compl[i].date_complaint_filed;

            let sum = document.createElement("p");
            sum.textContent = compl[i].summary;


            el.append(date_incident, date_compl, sum);
            list2.append(el);
        }

        app.append(make, list, title, list2);
    };
});

