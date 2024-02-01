/*Константы */
const workers = [""];
const hospitals_spb = [""];
const hospitals_region = [""];
const region = [""];
const instruments = [];
const directions = [""];
const hematology = [];
const biochemistry = [];
const immuno = [];
const urine = [];
const automate = [];
const hemostaz = [];
const microbiology = [];
const kschs = [];
const glycHgb = [];
const pcr = [];
const plastic = [];
const projects=[];
const current_region=["СПб"];
const myApp = "https://script.google.com/macros/s/AKfycbyvQdbQ3uAuv4TkZ6Zd5izHnTExImQq4q3aJRbMvy6QgtGmC3z9v33e77lvy_orlWjd/exec";//URL нашего приложения
const tasks = "https://docs.google.com/spreadsheets/d/1TxrHuLnFDF-2-bUiNa9wrtOtEfBbHfg9mc1zpPs1MJY/edit#gid=0";//уникальный идентификатор нашей таблицы
const xhrstatus = [1];
const text = [];
let old_code = "";
let stages_statistics=[0,0,0,0,0,0];
function burgerMenu() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

window.onload = checkAuth();
function checkAuth() {
    if (localStorage.getItem('ems_user')&&localStorage.getItem('ems_name')&&localStorage.getItem('ems_level')&&localStorage.getItem('ems_place')) {
        document.getElementById('auth').classList.add('hide');
        document.getElementById('negative_response').innerText = "";
        document.getElementById('myTopnav').classList.remove('disabled');
    }
    if(localStorage.getItem('ems_level')=="administrator") {
        document.getElementById('projectsMainPage').classList.remove('hide');
    }
    if(localStorage.getItem('ems_level')=="user" && localStorage.getItem('ems_place')=="СПб") {
        document.getElementById('projects_regions').classList.add('disabled');
        document.getElementById('projectsMainPage').classList.remove('hide');
    }
    if(localStorage.getItem('ems_level')=="user" && localStorage.getItem('ems_place')!="СПб") {
        document.getElementById('projects_main').classList.add('disabled');
        document.getElementById('projects_main').classList.remove('active');
        document.getElementById('projects_regions').classList.add('active');
        document.getElementById('projectsMainPage').classList.remove('hide');
        current_region[0]="Регионы"
    } 
}
document.getElementById('projects_main').addEventListener('click',openProjectsMain)
document.getElementById('projects_regions').addEventListener('click',openProjectsRegions)
document.getElementById('voronka').addEventListener('click',openVoronka)
function openProjectsMain() {
    document.getElementById('projects_main').classList.add('active');
    document.getElementById('projects_regions').classList.remove('active');
    document.getElementById('voronka').classList.remove('active');
    document.getElementById('projects_nav').classList.remove('hide');
    current_region[0]="СПб";
    openAddProjectMainForm();
}
function openProjectsRegions() {
    document.getElementById('projects_main').classList.remove('active');
    document.getElementById('projects_regions').classList.add('active');
    document.getElementById('voronka').classList.remove('active');
    document.getElementById('projects_nav').classList.remove('hide');
    current_region[0]="Регионы";
    openAddProjectMainForm();
}
function openVoronka() {
    document.getElementById('projects_main').classList.remove('active');
    document.getElementById('projects_regions').classList.remove('active');
    document.getElementById('voronka').classList.add('active');
    showVoronkaPage();
}

document.getElementById('exit').addEventListener('click', (e)=>{
    document.getElementById('projectsMainPage').classList.add('hide');
    localStorage.removeItem('ems_user');
    localStorage.removeItem('ems_name');
    localStorage.removeItem('ems_level');
    localStorage.removeItem('ems_place');
    setTimeout(()=> {window.location.reload()}, 100);
})

document.getElementById('login').addEventListener('click', checkUsers);
function checkUsers() {
    const url = `https://docs.google.com/spreadsheets/d/1TxrHuLnFDF-2-bUiNa9wrtOtEfBbHfg9mc1zpPs1MJY/gviz/tq?gid=1828751867`;
    fetch(url)
    .then(res => res.text())
    .then(rep => {
        const data2 = JSON.parse(rep.substr(47).slice(0,-2));
        const user = document.getElementById('user').value;
        const pass = document.getElementById('pass').value;
        const length = data2.table.rows.length;
        const users=[];
        const names=[];
        const levels=[];
        const places=[];
        const passwords=[];
        for (let i=1; i<length; i+=1) {
            if(data2.table.rows[i].c[0] && data2.table.rows[i].c[0].v != null) users.push(data2.table.rows[i].c[0].v)
            if(data2.table.rows[i].c[1] && data2.table.rows[i].c[1].v != null) passwords.push(data2.table.rows[i].c[1].v);
            if(data2.table.rows[i].c[2] && data2.table.rows[i].c[2].v != null) levels.push(data2.table.rows[i].c[2].v);
            if(data2.table.rows[i].c[3] && data2.table.rows[i].c[3].v != null) names.push(data2.table.rows[i].c[3].v);
            if(data2.table.rows[i].c[4] && data2.table.rows[i].c[4].v != null) places.push(data2.table.rows[i].c[4].v);
        }
        if (users.indexOf(user)!==-1) {
            if (passwords[[users.indexOf(user)]]== pass) {
                localStorage.setItem('ems_user', `${user}`);
                localStorage.setItem('ems_name', `${names[[users.indexOf(user)]]}`);
                localStorage.setItem('ems_level', `${levels[[users.indexOf(user)]]}`);
                localStorage.setItem('ems_place', `${places[[users.indexOf(user)]]}`);
                places[[users.indexOf(user)]]=="СПб"?current_region[0]="СПб":current_region[0]="Регионы";
                checkAuth();
                document.getElementById('myTopnav').classList.remove('disabled');
            } else {
                document.getElementById('negative_response').innerText = 'Неверный пароль'
            }
        } else {
            document.getElementById('negative_response').innerText = 'Неверный логин. Обратитесь к администратору'
        }
    })    
}

/* Получение данных: 
getInfo - получение справочной информации о приборах, учреждениях, менеджерах; 
getProjects - получение данных по всем занесеным проектам */
function getInfo() {
    const url = `https://docs.google.com/spreadsheets/d/1TxrHuLnFDF-2-bUiNa9wrtOtEfBbHfg9mc1zpPs1MJY/gviz/tq?gid=553069459`;
    fetch(url)
    .then(res => res.text())
    .then(rep => {
        const data2 = JSON.parse(rep.substr(47).slice(0,-2));
        const length = data2.table.rows.length;
        for (let i=3; i<14; i+=1) directions.push(data2.table.rows[0].c[i].v)
        for (let i=1; i<length; i+=1) {
            if(data2.table.rows[i].c[0] && data2.table.rows[i].c[0].v != null) hospitals_spb.push(data2.table.rows[i].c[0].v)
            if(data2.table.rows[i].c[1] && data2.table.rows[i].c[1].v != null) hospitals_region.push(data2.table.rows[i].c[1].v);
            if(data2.table.rows[i].c[2] && data2.table.rows[i].c[2].v != null) region.push(data2.table.rows[i].c[2].v);
            if(data2.table.rows[i].c[3] && data2.table.rows[i].c[3].v != null) hematology.push(data2.table.rows[i].c[3].v);
            if(data2.table.rows[i].c[4] && data2.table.rows[i].c[4].v != null) biochemistry.push(data2.table.rows[i].c[4].v);
            if(data2.table.rows[i].c[5] && data2.table.rows[i].c[5].v != null) immuno.push(data2.table.rows[i].c[5].v);
            if(data2.table.rows[i].c[6] && data2.table.rows[i].c[6].v != null) urine.push(data2.table.rows[i].c[6].v);
            if(data2.table.rows[i].c[7] && data2.table.rows[i].c[7].v != null) automate.push(data2.table.rows[i].c[7].v);
            if(data2.table.rows[i].c[8] && data2.table.rows[i].c[8].v != null) hemostaz.push(data2.table.rows[i].c[8].v);
            if(data2.table.rows[i].c[9] && data2.table.rows[i].c[9].v != null) microbiology.push(data2.table.rows[i].c[9].v);
            if(data2.table.rows[i].c[10] && data2.table.rows[i].c[10].v != null) glycHgb.push(data2.table.rows[i].c[10].v);
            if(data2.table.rows[i].c[11] && data2.table.rows[i].c[11].v != null) kschs.push(data2.table.rows[i].c[11].v);
            if(data2.table.rows[i].c[12] && data2.table.rows[i].c[12].v != null) pcr.push(data2.table.rows[i].c[12].v);
            if(data2.table.rows[i].c[13] && data2.table.rows[i].c[13].v != null) plastic.push(data2.table.rows[i].c[13].v);
            if(data2.table.rows[i].c[14] && data2.table.rows[i].c[14].v != null) workers.push(data2.table.rows[i].c[14].v);
        }
    })
}
window.onload = getInfo();

function getProjects() {
    projects.length=0;
    const url = `https://docs.google.com/spreadsheets/d/1TxrHuLnFDF-2-bUiNa9wrtOtEfBbHfg9mc1zpPs1MJY/gviz/tq?gid=0`;
    fetch(url)
    .then(res => res.text())
    .then(rep => {
        const data2 = JSON.parse(rep.substr(47).slice(0,-2));
        const length = data2.table.rows.length;
        for (let i=0; i<length; i+=1) {
            if(data2.table.rows[i].c[0] && data2.table.rows[i].c[0].v != null) {
                let project = {};
                project.manager = data2.table.rows[i].c[0].v
                project.region = data2.table.rows[i].c[1].v
                project.facility = data2.table.rows[i].c[2].v
                project.direction = data2.table.rows[i].c[3].v
                project.contract = data2.table.rows[i].c[4].v
                project.analyzer = data2.table.rows[i].c[5].v
                project.count = data2.table.rows[i].c[6].v
                project.stage = data2.table.rows[i].c[7].v
                project.code = data2.table.rows[i].c[8].v
                project.start = data2.table.rows[i].c[9].v
                project.dates = data2.table.rows[i].c[10].v
                project.comment = data2.table.rows[i].c[11] ? data2.table.rows[i].c[11].v : "";
                projects.push(project)
            }
        }
    })
}
window.onload = getProjects();
/*Получение данных завершено*/

/*Нажатие на кнопку заведение нового проекта*/
document.getElementById('add_project_main').addEventListener('click', openAddProjectMainForm);
function openAddProjectMainForm() {
    document.getElementById('add_project_main').classList.add('disabled');
    document.getElementById('project_main_box').classList.remove('hide');
    document.getElementById('confirm_project_main').classList.remove('hide');
    document.getElementById('table_field').innerHTML='';
    document.getElementById('projects_main_list').classList.add('hide');
    document.getElementById('save_edit_project_main').classList.add('hide');
    document.getElementById('triangle').classList.add('hide');
    if(document.getElementById('application')) document.getElementById('application').parentNode.removeChild(document.getElementById('application'));
    if(document.getElementById('facility')) document.getElementById('facility').parentNode.removeChild(document.getElementById('facility'));
    if(document.getElementById('direction')) document.getElementById('direction').parentNode.removeChild(document.getElementById('direction'));
    if(document.getElementById('new_facility')) document.getElementById('new_facility').parentNode.removeChild(document.getElementById('new_facility'));
    if(document.getElementById('new_instrument')) document.getElementById('new_facility').parentNode.removeChild(document.getElementById('new_facility'));
    
    const application = document.createElement('select');
    application.className = 'select';
    application.id = 'application';
    document.getElementById('select_application').appendChild(application);
    if(localStorage.getItem('ems_level')=="user") {
        document.getElementById('application').innerHTML="";
        let option = document.createElement('option');
        option.value = localStorage.getItem('ems_name');
        option.text = localStorage.getItem('ems_name');;
        document.getElementById('application').appendChild(option);
    } else if (current_region[0]=="СПб") {
        for (let i=0; i<5; i+=1) {
            let option = document.createElement('option');
            option.value = workers[i];
            option.text = workers[i];
            application.appendChild(option);
        }
    } else {
        for (let i=5; i<workers.length; i+=1) {
            let option = document.createElement('option');
            option.value = workers[i];
            option.text = workers[i];
            application.appendChild(option);
        }
    }
    const facilities = document.createElement('select');
    facilities.className = 'select';
    facilities.id = 'facility';
    document.getElementById('select_facility').appendChild(facilities);
    if (current_region[0]=="СПб") {
        for (let i=0; i<hospitals_spb.length; i+=1) {
            let option = document.createElement('option');
            option.value = hospitals_spb[i];
            option.text = hospitals_spb[i];
            facilities.appendChild(option);
        }
    } else {
        for (let i=0; i<hospitals_region.length; i+=1) {
            let option = document.createElement('option');
            option.value = hospitals_region[i];
            option.text = hospitals_region[i];
            facilities.appendChild(option);
        }
    }
    document.getElementById('facility').addEventListener('click',checkIfNewFacility);
    const direction = document.createElement('select');
    direction.className = 'select';
    direction.id = 'direction';
    document.getElementById('select_direction').appendChild(direction);
    for (let i=0; i<directions.length; i+=1) {
        let option = document.createElement('option');
        option.value = directions[i];
        option.text = directions[i];
        direction.appendChild(option);
    }
    document.getElementById('direction').addEventListener('click',checkIfChangeDirection);
}

function checkIfNewFacility() {
    if(document.getElementById('new_facility')) document.getElementById('new_facility').parentNode.removeChild(document.getElementById('new_facility'));
    if (document.getElementById('facility').value == "Другое (ввести ниже)") {
        const new_facility = document.createElement('input');
        new_facility.type = 'text';
        new_facility.id = 'new_facility';
        document.getElementById('select_facility').appendChild(new_facility)
    }
}

function checkIfChangeDirection() {
    if(document.getElementById('new_analyzer')) document.getElementById('new_analyzer').parentNode.removeChild(document.getElementById('new_analyzer'));
    const direction = document.getElementById('direction').value;
    let analyzers = [];
    if(document.getElementById('analyzer')) {
        document.getElementById('analyzer').parentNode.removeChild(document.getElementById('analyzer'));
    }
    const analyzer = document.createElement('select');
    analyzer.className = 'select';
    analyzer.id = 'analyzer';
    document.getElementById('select_instrument').appendChild(analyzer);
    document.getElementById('analyzer').addEventListener('click',checkIfNewAnalyzer);
    if (direction == 'Гематология') analyzers = hematology.slice(0).sort();
    if (direction == 'Биохимия') analyzers = biochemistry.slice(0).sort();
    if (direction == 'Иммунохимия') analyzers = immuno.slice(0).sort();
    if (direction == 'Анализ_мочи') analyzers = urine.slice(0).sort();
    if (direction == 'Автоматизация') analyzers = automate.slice(0).sort();
    if (direction == 'Гемостаз') analyzers = hemostaz.slice(0).sort();
    if (direction == 'Бактериология') analyzers = microbiology.slice(0).sort();
    if (direction == 'Гликированный_гемоглобин') analyzers = glycHgb.slice(0).sort();
    if (direction == 'КЩС') analyzers = kschs.slice(0).sort();
    if (direction == 'ПЦР') analyzers = pcr.slice(0).sort();
    if (direction == 'Пластик') analyzers = plastic.slice(0).sort();
    for (let i=0; i<analyzers.length; i+=1) {
        let option = document.createElement('option');
        option.value = analyzers[i];
        option.text = analyzers[i];
        analyzer.appendChild(option);
    }
}

function checkIfNewAnalyzer() {
    if(document.getElementById('new_analyzer')) document.getElementById('new_analyzer').parentNode.removeChild(document.getElementById('new_analyzer'));
    if (document.getElementById('analyzer').value == "Другое (ввести ниже)") {
        const new_analyzer = document.createElement('input');
        new_analyzer.type = 'text';
        new_analyzer.id = 'new_analyzer';
        document.getElementById('select_instrument').appendChild(new_analyzer)
    }
}

document.getElementById('confirm_project_main').addEventListener('click',confirmProjectsMainClick);
function confirmProjectsMainClick() {
    const application = document.getElementById('application').value;
    const facility = document.getElementById('facility').value == "Другое (ввести ниже)" ? document.getElementById('new_facility').value : document.getElementById('facility').value;
    const new_facility_status = document.getElementById('facility').value == "Другое (ввести ниже)" ? 1 : 0;
    const direction = document.getElementById('direction').value;
    const instrument = document.getElementById('analyzer').value == "Другое (ввести ниже)" ? document.getElementById('new_analyzer').value : document.getElementById('analyzer').value;
    const new_instrument_status = document.getElementById('analyzer').value == "Другое (ввести ниже)" ? 1 : 0;
    const contract_type = document.getElementById('contract_type').value;
    const count = document.getElementById('select_number').value;
    const stage = document.getElementById('select_stage').value;
    const comment = document.getElementById('comment').value;
    const current_code = application +"__"+ facility +"__"+ direction +"__"+ contract_type +"__"+ instrument +"__"+ count;
    let repeat = projects.filter(el=>el.code == current_code);
    if (application === "") document.getElementById('confirmation_status').innerText='Выберите менеджера';
    else if (facility === "") document.getElementById('confirmation_status').innerText='Выберите учреждение';
    else if (direction === "") document.getElementById('confirmation_status').innerText='Выберите направление';
    else if (instrument === "") document.getElementById('confirmation_status').innerText='Выберите прибор';
    else if (contract_type === "") document.getElementById('confirmation_status').innerText='Укажите тип контракта';
    else if (count === "") document.getElementById('confirmation_status').innerText='Укажите номер прибора';
    else if (stage === "") document.getElementById('confirmation_status').innerText='Выберите этап проекта';
    else {
        if(repeat.length == 0) {
            document.getElementById('confirmation_status').classList.remove('red_status');
            document.getElementById('confirmation_status').classList.add('green_status');
            document.getElementById('confirmation_status').innerText='Проект добавляется в базу';
            downloadProjectToDatabase(application, facility, direction, instrument, contract_type, count, stage, comment, new_facility_status, new_instrument_status);
        } else {
            document.getElementById('confirmation_status').innerText='Такой проект уже есть в базе. Если ставится дубль прибора - измените номер прибора';
        }
    }

    /* Не забыть если новое учреждение или прибор внести в базу */
}

function downloadProjectToDatabase(application, facility, direction, instrument, contract_type, count, stage, comment, new_facility_status, new_instrument_status) {
    document.getElementById('confirmation_status').classList.remove('hide');
    const task = application+"__"+localStorage.getItem("ems_place")+"__"+facility+"__"+direction+"__"+contract_type+"__"+instrument+"__"+count+"__"+stage+"__"+comment;
	const action = "addTask";
	var xhr = new XMLHttpRequest();
	var body = 'task=' + encodeURIComponent(task) + '&action=' + encodeURIComponent(action);
	xhr.open("POST", myApp, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
        	text.push(xhr.response);
            xhrstatus[0] = xhrstatus[0]*2;
            alert(xhr.response)
            reloadSite(new_facility_status, new_instrument_status);
        }
    };
	try { xhr.send(body);} catch (err) {console.log(err) }

    if (new_facility_status == 1) {
        const task = localStorage.getItem("ems_place")+"__"+facility+"__"+application;
        const action = "addFacility";
        var xhr1 = new XMLHttpRequest();
        var body = 'task=' + encodeURIComponent(task) + '&action=' + encodeURIComponent(action);
        xhr1.open("POST", myApp, true);
        xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr1.onreadystatechange = function() {
            if (xhr1.readyState == 4 && xhr1.status == 200) {
                text.push(xhr1.response);
                xhrstatus[0] = xhrstatus[0]*2;
                alert(xhr1.response)
                reloadSite(new_facility_status, new_instrument_status);
            }
        };
        try { xhr1.send(body);} catch (err) {console.log(err) }
    }

    if (new_instrument_status == 1) {
        const task = direction+"__"+instrument+"__"+application;
        const action = "addInstrument";
        var xhr2 = new XMLHttpRequest();
        var body = 'task=' + encodeURIComponent(task) + '&action=' + encodeURIComponent(action);
        xhr2.open("POST", myApp, true);
        xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr2.onreadystatechange = function() {
            if (xhr2.readyState == 4 && xhr2.status == 200) {
                text.push(xhr2.response);
                xhrstatus[0] = xhrstatus[0]*2;
                alert(xhr2.response)
                reloadSite(new_facility_status, new_instrument_status);
            }
        };
        try { xhr2.send(body);} catch (err) {console.log(err) }
    }
}

function reloadSite(new_facility_status, new_instrument_status) {
    if (xhrstatus[0] == 2**(1 + new_facility_status + new_instrument_status)) {
        window.location.reload(); 
    }
}

document.getElementById('list_projects_main').addEventListener('click', ()=>{
    document.getElementById('list_projects_main').classList.add('disabled');
    setTimeout(()=>{document.getElementById('list_projects_main').classList.remove('disabled')},1000);
    clickListProjects();
});
function clickListProjects() {
    document.getElementById('project_main_box').classList.add('hide');
    document.getElementById('save_edit_project_main').classList.add('hide');
    document.getElementById('confirm_project_main').classList.add('hide');
    document.getElementById('confirmation_status').classList.add('hide');
    document.getElementById('projects_main_list').classList.remove('hide');
    document.getElementById('add_project_main').classList.remove('disabled');
    if(document.getElementById('application2')) document.getElementById('application2').parentNode.removeChild(document.getElementById('application2'));
    const application = document.createElement('select');
    application.className = 'select';
    application.id = 'application2';
    document.getElementById('select_application2').appendChild(application);
    if(localStorage.getItem('ems_level')=="user") {
        document.getElementById('application2').innerHTML="";
        let option = document.createElement('option');
        option.value = localStorage.getItem('ems_name');
        option.text = localStorage.getItem('ems_name');;
        document.getElementById('application2').appendChild(option);
    } else {
        for (let i=0; i<workers.length; i+=1) {
            let option = document.createElement('option');
            option.value = workers[i];
            option.text = workers[i];
            application.appendChild(option);
        }
    }
    document.getElementById('select_application2').addEventListener('change',buildListProjectsTable)

    if(document.getElementById('direction2')) document.getElementById('direction2').parentNode.removeChild(document.getElementById('direction2'));
    const direction = document.createElement('select');
    direction.className = 'select';
    direction.id = 'direction2';
    document.getElementById('select_direction2').appendChild(direction);
    for (let i=0; i<directions.length; i+=1) {
        let option = document.createElement('option');
        option.value = directions[i];
        option.text = directions[i];
        direction.appendChild(option);
    }
    document.getElementById('select_direction2').addEventListener('change',buildListProjectsTable)
    document.getElementById('select_stage2').value="";
    document.getElementById('select_stage2').addEventListener('change',buildListProjectsTable)
    getProjects();
    setTimeout(()=>{buildListProjectsTable()},1000);
}

function buildListProjectsTable() {
    document.getElementById('new_projects').innerHTML="";
    document.getElementById('changed_projects').innerHTML="";
    let current_projects_filter = [];
    let new_projects_filter = [];
    let changed_projects_filter = [];
    stages_statistics=[0,0,0,0,0,0];
    if(localStorage.getItem('ems_level')=="user") {
        current_projects_filter = projects.filter((el)=>el.manager == localStorage.getItem('ems_name'));
    } else {
        if(document.getElementById('application2').value != "") {
            current_projects_filter = projects.filter((el)=>el.manager == document.getElementById('application2').value);
        } else {
            current_projects_filter = projects;
        }
    }
    if(!document.getElementById('voronka').classList.contains('active')){
        if (current_region[0] == "СПб") current_projects_filter = current_projects_filter.filter((el)=>el.region == "СПб");
        else current_projects_filter = current_projects_filter.filter((el)=>el.region != "СПб");    
    }
    
    if(document.getElementById('direction2').value != "") {
        current_projects_filter = current_projects_filter.filter((el)=>el.direction == document.getElementById('direction2').value);
    }

    if (document.getElementById('select_stage2').value != "") current_projects_filter = current_projects_filter.filter((el)=>el.stage == document.getElementById('select_stage2').value);
    if (document.getElementById('date_row_from').value != "" && document.getElementById('voronka').classList.contains('active')) {
        new_projects_filter = current_projects_filter.filter((el)=>(Date.parse(Number(el.start.split('Date(')[1].split(",")[0]), Number(el.start.split('Date(')[1].split(",")[1]), Number(el.start.split('Date(')[1].split(",")[2].split(')')[0])) - Date.parse(document.getElementById('date_row_from').value)) >= 0);
        changed_projects_filter = current_projects_filter.filter((el)=>(Date.parse(el.dates.split(':')[el.dates.split(':').length-1].split('.').reverse()) - Date.parse(document.getElementById('date_row_from').value)) >= 0)
    }
    if (document.getElementById('date_row_to').value != "" && document.getElementById('voronka').classList.contains('active')) {
        new_projects_filter = new_projects_filter.filter((el)=>(Date.parse(Number(el.start.split('Date(')[1].split(",")[0].split('.')), Number(el.start.split('Date(')[1].split(",")[1]), Number(el.start.split('Date(')[1].split(",")[2].split(')')[0])) - Date.parse(document.getElementById('date_row_to').value)) <= 0);
        changed_projects_filter = changed_projects_filter.filter((el)=>(Date.parse(el.dates.split(':')[el.dates.split(':').length-1].split('.').reverse()) - Date.parse(document.getElementById('date_row_to').value)) <= 0);
    }
    if(new_projects_filter.length>0) {
        for (let i=0; i< new_projects_filter.length; i+=1) {
            const x = document.createElement('p');
            x.className = 'new_projects_text';
            x.innerText = `${i+1}. ${new_projects_filter[i].facility} - ${new_projects_filter[i].analyzer} (${new Date(Number(new_projects_filter[i].start.split('Date(')[1].split(",")[0]), Number(new_projects_filter[i].start.split('Date(')[1].split(",")[1]), Number(new_projects_filter[i].start.split('Date(')[1].split(",")[2].split(')')[0])).toLocaleDateString()})`;
            document.getElementById('new_projects').appendChild(x);
        }
    } else {
        const x = document.createElement('p');
        x.className = 'new_projects_text';
        x.innerText = 'В указанный диапазон дат новые проекты отсутствуют';
        document.getElementById('new_projects').appendChild(x);
    }

    changed_projects_filter = changed_projects_filter.filter( x => !new_projects_filter.filter( y => y.code === x.code).length);
    if(changed_projects_filter.length>0) {
        for (let i=0; i< changed_projects_filter.length; i+=1) {
            const x = document.createElement('p');
            x.className = 'changed_projects_text';
            x.innerText = `${i+1}. ${changed_projects_filter[i].facility} - ${changed_projects_filter[i].analyzer} (${changed_projects_filter[i].dates.split(':').length-1} этап:${changed_projects_filter[i].dates.split(':')[changed_projects_filter[i].dates.split(':').length-1]})`;
            document.getElementById('changed_projects').appendChild(x);
        }
    } else {
        const x = document.createElement('p');
        x.className = 'changed_projects_text';
        x.innerText = 'В указанный диапазон дат текущие проекты по этапам не продвигались';
        document.getElementById('changed_projects').appendChild(x);
    }
    document.getElementById('table_field').innerHTML="";
    const header=["Менеджер","Учреждение","Направление","Контракт","Прибор","Номер прибора","Этап","Примечание"]
    const table = document.createElement('table');
    table.className = 'supertable';
    const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const players_column_width = (width - 50) / 9;
    for (let i=0; i<current_projects_filter.length+1; i+=1) {
        const tr = table.insertRow();
        if (i>0) { 
            let index = new_projects_filter.filter(el => el.code == current_projects_filter[i-1].code)
            let index2 = changed_projects_filter.filter(el => el.code == current_projects_filter[i-1].code)
            index.length > 0 ? tr.className = 'greenrow superrow': index2.length > 0 ? tr.className = 'aquamarinerow superrow': tr.className = 'superrow'
        }
        for (let j=0; j<header.length+1; j+=1) {
            const td = tr.insertCell();
            if (i===0&& j<header.length) td.appendChild(document.createTextNode(`${header[j]}`));
            else if (i===0 && j==header.length) td.appendChild(document.createTextNode('Удаление / Изменение'));
            else {
                td.className = 'supercell';
                td.style.width = (j===0||j===3||j===4||j===8)? `${players_column_width*0.8}px`:  (j===1||j===2||j===7)? `${players_column_width*1.3}px`:  `${players_column_width*0.3}px`;
                // if (j===2|| j===5||j===6|| j===8|| j===9) td.classList.add('hide_column');
                if (j===0 && i>0) {
                    td.appendChild(document.createTextNode(`${current_projects_filter[i-1].manager}`))
                } else if (j===1 && i>0) {
                    td.appendChild(document.createTextNode(`${current_projects_filter[i-1].facility}`))
                } else if (j===2 && i>0) {
                    td.appendChild(document.createTextNode(`${current_projects_filter[i-1].direction}`))
                } else if (j===3 && i>0) {
                    td.appendChild(document.createTextNode(`${current_projects_filter[i-1].contract}`))
                } else if (j===4 && i>0) {
                    td.appendChild(document.createTextNode(`${current_projects_filter[i-1].analyzer}`))
                } else if (j===5 && i>0) {
                    td.appendChild(document.createTextNode(`${current_projects_filter[i-1].count}`))
                } else if (j===6 && i>0) {
                    td.appendChild(document.createTextNode(`${current_projects_filter[i-1].stage}`))
                    stages_statistics[current_projects_filter[i-1].stage - 1] +=1;
                } else if (j===7 && i>0) {
                    td.appendChild(document.createTextNode(`${current_projects_filter[i-1].comment}`))
                } else if (j===8 && i>0) { 
                    const deleteIcon = document.createElement('img');
                    deleteIcon.src = './deleteIcon2.png';
                    deleteIcon.classList.add('clickable');
                    deleteIcon.classList.add('icon');
                    deleteIcon.id = `img_${current_projects_filter[i-1].code}__${current_projects_filter[i-1].stage}`;
                    deleteIcon.width= 20;
                    deleteIcon.addEventListener('click', (e)=>{deleteProjectRow(e)})
                    td.appendChild(deleteIcon)
                    const editIcon = document.createElement('img');
                    editIcon.src = './editIcon.png';
                    editIcon.classList.add('clickable');
                    editIcon.classList.add('icon');
                    editIcon.id = `img_edit_img_${current_projects_filter[i-1].code}__${current_projects_filter[i-1].stage}__${current_projects_filter[i-1].comment}`;
                    editIcon.width= 20;
                    editIcon.addEventListener('click', (e)=>{openEditProjectForm(e)})
                    td.appendChild(editIcon)
                }
            };
        }
    }
    document.getElementById('table_field').appendChild(table);
    setTimeout(()=>{
        document.getElementById('stage6').innerHTML = stages_statistics[5];
        document.getElementById('stage5').innerHTML = stages_statistics[4]+stages_statistics[5];
        document.getElementById('stage4').innerHTML = stages_statistics[3]+stages_statistics[4]+stages_statistics[5];
        document.getElementById('stage3').innerHTML = stages_statistics[2]+stages_statistics[3]+stages_statistics[4]+stages_statistics[5];
        document.getElementById('stage2').innerHTML = stages_statistics[1]+stages_statistics[2]+stages_statistics[3]+stages_statistics[4]+stages_statistics[5];
        document.getElementById('stage1').innerHTML = stages_statistics[0]+stages_statistics[1]+stages_statistics[2]+stages_statistics[3]+stages_statistics[4]+stages_statistics[5];
    },1500)
}

function deleteProjectRow(e) {
    const task = e.target.id.split('img_')[1]; 
    const action = "deleteTask";
	var xhr = new XMLHttpRequest();
	var body = 'task=' + encodeURIComponent(task) + '&action=' + encodeURIComponent(action);
	xhr.open("POST", myApp, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
        	text.push(xhr.response);
            alert(xhr.response)
            xhrstatus[0] = 2;
            setTimeout(()=>{clickListProjects()},1000);
        }
    };
	try { xhr.send(body);} catch (err) {console.log(err) }
}
function openEditProjectForm(e) {
    document.getElementById('project_main_box').classList.remove('hide');
    document.getElementById('projects_nav').classList.add('hide');
    document.getElementById('projects_main_list').classList.add('hide');
    old_code = e.target.id.split('img_edit_img_')[1];
    if(document.getElementById('application')) document.getElementById('application').parentNode.removeChild(document.getElementById('application'));
    const application = document.createElement('select');
    application.className = 'select';
    application.id = 'application';
    document.getElementById('select_application').appendChild(application);
    if(localStorage.getItem('ems_level')=="user") {
        document.getElementById('application').innerHTML="";
        let option = document.createElement('option');
        option.value = localStorage.getItem('ems_name');
        option.text = localStorage.getItem('ems_name');;
        document.getElementById('application').appendChild(option);
    } else {
        for (let i=0; i<workers.length; i+=1) {
            let option = document.createElement('option');
            option.value = workers[i];
            option.text = workers[i];
            if (workers[i] == e.target.id.split('img_edit_img_')[1].split('__')[0]) option.selected=true;
            application.appendChild(option);
        }
    }
    if(document.getElementById('facility')) document.getElementById('facility').parentNode.removeChild(document.getElementById('facility'));
    const facilities = document.createElement('select');
    facilities.className = 'select';
    facilities.id = 'facility';
    document.getElementById('select_facility').appendChild(facilities);
    if (hospitals_spb.indexOf(e.target.id.split('img_edit_img_')[1].split('__')[1]) != -1) {
        for (let i=0; i<hospitals_spb.length; i+=1) {
            let option = document.createElement('option');
            option.value = hospitals_spb[i];
            option.text = hospitals_spb[i];
            if (hospitals_spb[i] == e.target.id.split('img_edit_img_')[1].split('__')[1]) option.selected=true;
            facilities.appendChild(option);    
        }
    } else {
        for (let i=0; i<hospitals_region.length; i+=1) {
            let option = document.createElement('option');
            option.value = hospitals_region[i];
            option.text = hospitals_region[i];
            if (hospitals_region[i] == e.target.id.split('img_edit_img_')[1].split('__')[1]) option.selected=true;
            facilities.appendChild(option);
        }
    }
    document.getElementById('facility').addEventListener('click',checkIfNewFacility);
    if(document.getElementById('direction')) document.getElementById('direction').parentNode.removeChild(document.getElementById('direction'));
    const direction = document.createElement('select');
    direction.className = 'select';
    direction.id = 'direction';
    document.getElementById('select_direction').appendChild(direction);
    for (let i=0; i<directions.length; i+=1) {
        let option = document.createElement('option');
        option.value = directions[i];
        option.text = directions[i];
        if (directions[i] == e.target.id.split('img_edit_img_')[1].split('__')[2]) option.selected=true;
        direction.appendChild(option);
    }
    document.getElementById('direction').addEventListener('click',checkIfChangeDirection);
    if(document.getElementById('analyzer')) document.getElementById('analyzer').parentNode.removeChild(document.getElementById('analyzer'));
    const analyzer = document.createElement('select');
    let analyzers = [];
    analyzer.className = 'select';
    analyzer.id = 'analyzer';
    document.getElementById('select_instrument').appendChild(analyzer);
    document.getElementById('analyzer').addEventListener('click',checkIfNewAnalyzer);
    if (e.target.id.split('img_edit_img_')[1].split('__')[2] == 'Гематология') analyzers = hematology.slice(0).sort();
    if (e.target.id.split('img_edit_img_')[1].split('__')[2] == 'Биохимия') analyzers = biochemistry.slice(0).sort();
    if (e.target.id.split('img_edit_img_')[1].split('__')[2] == 'Иммунохимия') analyzers = immuno.slice(0).sort();
    if (e.target.id.split('img_edit_img_')[1].split('__')[2] == 'Анализ_мочи') analyzers = urine.slice(0).sort();
    if (e.target.id.split('img_edit_img_')[1].split('__')[2] == 'Автоматизация') analyzers = automate.slice(0).sort();
    if (e.target.id.split('img_edit_img_')[1].split('__')[2] == 'Гемостаз') analyzers = hemostaz.slice(0).sort();
    if (e.target.id.split('img_edit_img_')[1].split('__')[2] == 'Бактериология') analyzers = microbiology.slice(0).sort();
    if (e.target.id.split('img_edit_img_')[1].split('__')[2] == 'Гликированный_гемоглобин') analyzers = glycHgb.slice(0).sort();
    if (e.target.id.split('img_edit_img_')[1].split('__')[2] == 'КЩС') analyzers = kschs.slice(0).sort();
    if (e.target.id.split('img_edit_img_')[1].split('__')[2] == 'ПЦР') analyzers = pcr.slice(0).sort();
    if (e.target.id.split('img_edit_img_')[1].split('__')[2] == 'Пластик') analyzers = plastic.slice(0).sort();
    for (let i=0; i<analyzers.length; i+=1) {
        let option = document.createElement('option');
        option.value = analyzers[i];
        option.text = analyzers[i];
        if (analyzers[i] == e.target.id.split('img_edit_img_')[1].split('__')[4]) option.selected=true;
        analyzer.appendChild(option);
    }
    
    document.getElementById("contract_type").value = 
        e.target.id.split('img_edit_img_')[1].split('__')[4] == "Продажа" ? 
        document.getElementById("contract_type").getElementsByTagName('option')[1].value:
        document.getElementById("contract_type").getElementsByTagName('option')[2].value;
    document.getElementById("select_number").value = e.target.id.split('img_edit_img_')[1].split('__')[5]
    document.getElementById("select_stage").value = document.getElementById("select_stage").getElementsByTagName('option')[e.target.id.split('img_edit_img_')[1].split('__')[6]].value;
    document.getElementById("comment").value = e.target.id.split('img_edit_img_')[1].split('__')[7];
    document.getElementById('save_edit_project_main').classList.remove('hide');
}

document.getElementById('save_edit_project_main').addEventListener('click', editProjectRow);

function editProjectRow() {
    document.getElementById('confirmation_status').classList.remove('hide');
    const application = document.getElementById('application').value;
    const facility = document.getElementById('facility').value == "Другое (ввести ниже)" ? document.getElementById('new_facility').value : document.getElementById('facility').value;
    const new_facility_status = document.getElementById('facility').value == "Другое (ввести ниже)" ? 1 : 0;
    const direction = document.getElementById('direction').value;
    const instrument = document.getElementById('analyzer').value == "Другое (ввести ниже)" ? document.getElementById('new_analyzer').value : document.getElementById('analyzer').value;
    const new_instrument_status = document.getElementById('analyzer').value == "Другое (ввести ниже)" ? 1 : 0;
    const contract_type = document.getElementById('contract_type').value;
    const count = document.getElementById('select_number').value;
    const stage = document.getElementById('select_stage').value;
    const comment = document.getElementById('comment').value;
    const task = old_code +"__"+ application +"__"+ facility +"__"+ direction +"__"+ contract_type +"__"+ instrument +"__"+ count +"__"+ stage+"__"+ comment;
    if (application === "") document.getElementById('confirmation_status').innerText='Выберите менеджера';
    else if (facility === "") document.getElementById('confirmation_status').innerText='Выберите учреждение';
    else if (direction === "") document.getElementById('confirmation_status').innerText='Выберите направление';
    else if (instrument === "") document.getElementById('confirmation_status').innerText='Выберите прибор';
    else if (contract_type === "") document.getElementById('confirmation_status').innerText='Укажите тип контракта';
    else if (count === "") document.getElementById('confirmation_status').innerText='Укажите номер прибора';
    else if (stage === "") document.getElementById('confirmation_status').innerText='Выберите этап проекта';
    else {
        document.getElementById('confirmation_status').classList.remove('red_status');
            document.getElementById('confirmation_status').classList.add('green_status');
            document.getElementById('confirmation_status').innerText='Изменения проекта вносятся в базу';
            const action = "updateTask";
            var xhr = new XMLHttpRequest();
            var body = 'task=' + encodeURIComponent(task) + '&action=' + encodeURIComponent(action);
            xhr.open("POST", myApp, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    text.push(xhr.response);
                    alert(xhr.response)
                    xhrstatus[0] = 2;
                    setTimeout(()=>{clickListProjects()},1000);
                }
            };
            try { xhr.send(body);} catch (err) {console.log(err) }
        }
}

function showVoronkaPage() {
    clickListProjects();
    document.getElementById('triangle').classList.remove('hide');
    document.getElementById('projects_nav').classList.add('hide');
    // document.getElementById('date_row_from').value = new Date().setDate((new Date().getDate()-90))
    let today = new Date();
    today.setDate((today.getDate()-90));
    document.getElementById('date_row_from').value = today.toLocaleDateString('sv');
    document.getElementById('date_row_to').value = new Date().toLocaleDateString('sv');
    document.getElementById('date_row_from').addEventListener('change', clickListProjects)
    document.getElementById('date_row_to').addEventListener('change', clickListProjects)
}