/*Константы */
const workers = [""];
const hospitals_spb = [""];
const hospitals_region = [""];
const region = [""];
const instruments = []
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
    if(localStorage.getItem('ems_level')=="user" && localStorage.getItem('ems_place')=="СПб") {
        document.getElementById('projects_regions').classList.add('disabled');
        document.getElementById('projectsMainPage').classList.remove('hide');
    }
    if(localStorage.getItem('ems_level')=="user" && localStorage.getItem('ems_place')!="СПб") {
        document.getElementById('projects_main').classList.add('disabled');
        document.getElementById('projects_main').classList.remove('active');
        document.getElementById('projects_regions').classList.add('active');
    } 
}

document.getElementById('exit').addEventListener('click', (e)=>{
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


/*Отрисовска при загрузке*/
function getInfo() {
    const url = `https://docs.google.com/spreadsheets/d/1TxrHuLnFDF-2-bUiNa9wrtOtEfBbHfg9mc1zpPs1MJY/gviz/tq?gid=553069459`;
    fetch(url)
    .then(res => res.text())
    .then(rep => {
        const data2 = JSON.parse(rep.substr(47).slice(0,-2));
        const length = data2.table.rows.length;
        for (let i=1; i<length; i+=1) {
            if(data2.table.rows[i].c[0] && data2.table.rows[i].c[0].v != null) hospitals_spb.push(data2.table.rows[i].c[0].v)
            if(data2.table.rows[i].c[1] && data2.table.rows[i].c[1].v != null) hospitals_region.push(data2.table.rows[i].c[1].v);
            if(data2.table.rows[i].c[2] && data2.table.rows[i].c[2].v != null) region.push(data2.table.rows[i].c[2].v);
            if(data2.table.rows[i].c[3] && data2.table.rows[i].c[3].v != null) hematology.push(data2.table.rows[i].c[3].v.toLowerCase());
            if(data2.table.rows[i].c[4] && data2.table.rows[i].c[4].v != null) biochemistry.push(data2.table.rows[i].c[4].v.toLowerCase());
            if(data2.table.rows[i].c[5] && data2.table.rows[i].c[5].v != null) immuno.push(data2.table.rows[i].c[5].v.toLowerCase());
            if(data2.table.rows[i].c[6] && data2.table.rows[i].c[6].v != null) urine.push(data2.table.rows[i].c[6].v.toLowerCase());
            if(data2.table.rows[i].c[7] && data2.table.rows[i].c[7].v != null) automate.push(data2.table.rows[i].c[7].v.toLowerCase());
            if(data2.table.rows[i].c[8] && data2.table.rows[i].c[8].v != null) hemostaz.push(data2.table.rows[i].c[8].v.toLowerCase());
            if(data2.table.rows[i].c[9] && data2.table.rows[i].c[9].v != null) microbiology.push(data2.table.rows[i].c[9].v.toLowerCase());
            if(data2.table.rows[i].c[10] && data2.table.rows[i].c[10].v != null) glycHgb.push(data2.table.rows[i].c[10].v.toLowerCase());
            if(data2.table.rows[i].c[11] && data2.table.rows[i].c[11].v != null) kschs.push(data2.table.rows[i].c[11].v.toLowerCase());
            if(data2.table.rows[i].c[12] && data2.table.rows[i].c[12].v != null) pcr.push(data2.table.rows[i].c[12].v.toLowerCase());
            if(data2.table.rows[i].c[13] && data2.table.rows[i].c[13].v != null) plastic.push(data2.table.rows[i].c[13].v.toLowerCase());
            if(data2.table.rows[i].c[14] && data2.table.rows[i].c[14].v != null) workers.push(data2.table.rows[i].c[14].v);
        }
    })
    // .then(rep => {
    //     const application = document.createElement('select');
    //     application.className = 'select';
    //     application.id = 'application';
    //     document.getElementById('select_application').appendChild(application);
    //     for (let i=0; i<workers.length; i+=1) {
    //         let option = document.createElement('option');
    //         option.value = workers[i];
    //         option.text = workers[i];
    //         application.appendChild(option);
    //     }
    //     const facilities = document.createElement('select');
    //     facilities.className = 'select';
    //     facilities.id = 'facility';
    //     document.getElementById('select_facility').appendChild(facilities);
    //     for (let i=0; i<hospitals_spb.length; i+=1) {
    //         let option = document.createElement('option');
    //         option.value = hospitals_spb[i];
    //         option.text = hospitals_spb[i];
    //         facilities.appendChild(option);
    //     }
    //     document.getElementById('facility').addEventListener('click',checkIfNewFacility);
    //     // const facilities2 = document.createElement('select');
    //     // facilities2.className = 'select';
    //     // facilities2.id = 'facility2';
    //     // document.getElementById('select_facility2').appendChild(facilities2);
    //     // for (let i=0; i<hospitals.length; i+=1) {
    //     //     let option = document.createElement('option');
    //     //     option.value = hospitals[i];
    //     //     option.text = hospitals[i];
    //     //     facilities2.appendChild(option);
    //     // }
    //     // document.getElementById('facility2').addEventListener('change',getListVisits);
    //     const instrument = document.createElement('select');
    //     instrument.className = 'select';
    //     instrument.multiple='multiple';
    //     instrument.id = 'instrument';
    //     document.getElementById('select_instrument').appendChild(instrument);
    //     for (let i=0; i<instruments.length; i+=1) {
    //         let option = document.createElement('option');
    //         option.value = instruments[i];
    //         option.text = instruments[i];
    //         instrument.appendChild(option);
    //     }
    // })
    // .then(rep => {
    //     createMap();
    // })
}
window.onload = getInfo();

/* Выезды */
document.getElementById('projects_main').addEventListener('click',ProjectsMainClick);
function ProjectsMainClick() {
    document.getElementById('myTopnav').querySelectorAll('.active').forEach((el)=>el.classList.remove('active'));
    document.getElementById('projects_main').classList.add('active');
    burgerMenu();
    document.querySelectorAll('.main').forEach((el)=>el.classList.add('hide'));
    document.getElementById('project_main_box').classList.add('hide');
    document.getElementById('confirm_project_main').classList.add('hide');
    document.getElementById('projects_main_list').classList.add('hide');
    document.getElementById('projectsMainPage').classList.remove('hide');
    if(document.getElementById('new_facility')) document.getElementById('new_facility').parentNode.removeChild(document.getElementById('new_facility'));
}

document.getElementById('add_project_main').addEventListener('click',addProjectsMainClick);
function addProjectsMainClick() {
    document.getElementById('project_main_box').classList.remove('hide');
    document.getElementById('confirm_project_main').classList.remove('hide');
    document.getElementById('table_field').innerHTML='';
    document.getElementById('projects_main_list').classList.add('hide');
    document.getElementById('save_edit_project_main').classList.add('hide');
    if(localStorage.getItem('ems_level')=="user" && localStorage.getItem('ems_place')=="СПб") {
        document.getElementById('application').innerHTML="";
        let option = document.createElement('option');
        option.value = localStorage.getItem('ems_name');
        option.text = localStorage.getItem('ems_name');;
        document.getElementById('application').appendChild(option);
    }
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

document.getElementById('confirm_project_main').addEventListener('click',confirmProjectsMainClick);
function confirmProjectsMainClick() {
    const application = document.getElementById('application').value;
    const facility = document.getElementById('facility').value;
    const instrument = [];
    const contract_type = document.getElementById('contract_type').value;
    const x = document.getElementById('instrument');
    for (let i=0; i<x.options.length; i++){
        if(x.options[i].selected == true) {
            instrument.push(x.options[i].value)
        }
    }
    const sn = document.getElementById('sn').value;
    const reason = document.getElementById('reason').value;
    const work = document.getElementById('work').value;
    const report = document.getElementById('report').value;
    const type = document.getElementById('visit_type').value;
    if (date === "") document.getElementById('confirmation_status').innerText='Выберите дату начала';
    else if (date2 === "") document.getElementById('confirmation_status').innerText='Выберите дату конца визита';
    else if (application === "") document.getElementById('confirmation_status').innerText='Выберите аппликатора';
    else if (facility === "") document.getElementById('confirmation_status').innerText='Выберите учреждение';
    else if (instrument.length === 0) document.getElementById('confirmation_status').innerText='Выберите прибор(ы)';
    else if (reason === "") document.getElementById('confirmation_status').innerText='Укажите причину выезда';
    else if (work === "") document.getElementById('confirmation_status').innerText='Укажите выполненные работы';
    else if (report === "") document.getElementById('confirmation_status').innerText='Выберите статус акта';
    else if (type === "") document.getElementById('confirmation_status').innerText='Выберите тип выезда';
    else {
        document.getElementById('confirmation_status').classList.remove('red_status');
        document.getElementById('confirmation_status').classList.add('green_status');
        document.getElementById('confirmation_status').innerText='Выезд добавляется в базу';
        downloadVisitToDatabase(date, date2, application, facility, instrument, sn, reason, work, report, type);
    }

    /* Не забыть если новое учреждение или прибор внести в базу */
}
function downloadVisitToDatabase(date, date2, application, facility, instrument, sn, reason, work, report, type) {
    if (type=="Обучение") {
        fetch('https://sheetdb.io/api/v1/tkhtt2o9c61js?sheet=learning', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: [
                    {
                        'Date_from': `${date}`,
                        'Date_to': `${date2}`,
                        'Facility': `${facility}`,
                        'Instrument': `${instrument}`,
                        'SN': `${sn}`,
                        'Application': `${application}`,
                        'Author': `${localStorage.getItem('user')}`,
                        'id': `${date}_${date2}_${facility}_${instrument}_${application}`
                    }
                ]
            })
        }) 
    }
    fetch('https://sheetdb.io/api/v1/tkhtt2o9c61js?sheet=visits', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: [
                {
                    'Date_from': `${date}`,
                    'Date_to': `${date2}`,
                    'Facility': `${facility}`,
                    'Instrument': `${instrument}`,
                    'SN': `${sn}`,
                    'Application': `${application}`,
                    'Reason': `${reason}`,
                    'Works': `${work}`,
                    'Report': `${report}`,
                    'Work_type': `${type}`,
                    'Author': `${localStorage.getItem('user')}`,
                    'id': `${date}_${date2}_${facility}_${instrument}_${application}`
                }
            ]
        })
    })
    .then(res => res.text())
    .then(rep => {
        document.getElementById('confirmation_status').innerText='Выезд добавлен в базу';
        setTimeout(()=>{
           window.location.reload(); 
        },1500)
    })
}

document.getElementById('list_projects_main').addEventListener('click',listProjectsMainClick);
function listProjectsMainClick() {
    document.getElementById('visit_box').classList.add('hide');
    document.getElementById('confirm_visit').classList.add('hide');
    document.getElementById('visits_list').classList.remove('hide');
    getListVisits();
}

document.getElementById('week_filter').addEventListener('click',changeFilterWeekState);
function changeFilterWeekState() {
    const filter = document.getElementById('week_filter')
    if (filter.classList.contains('filter_selected')) filter.classList.remove('filter_selected')
    else filter.classList.add('filter_selected')
    getListVisits();
}
document.getElementById('learning_filter').addEventListener('click',changeFilterLearningState);
function changeFilterLearningState() {
    const filter = document.getElementById('learning_filter')
    if (filter.classList.contains('filter_selected')) filter.classList.remove('filter_selected')
    else filter.classList.add('filter_selected')
    getListVisits();
}

function getListVisits() {
    document.getElementById('table_field').innerHTML='';
    const url = `https://docs.google.com/spreadsheets/d/16ABEN54Ykbej-PhrbBjGlaHSXzNbD4PA8ecbpWc5QHQ/gviz/tq?gid=0`;
    const date1 = [];
    const date2 = [];
    const place = [];
    const machine = [];
    const sn = [];
    const applicator = [];
    const why = [];
    const done = [];
    const file = [];
    const deleteRow = [];
    const filter_man = document.getElementById('application2').value;
    const filter_hospital = document.getElementById('facility2').value;
    const filter_instrument = document.getElementById('instrument2').value;
    const filter_week = document.getElementById('week_filter').classList.contains('filter_selected')? new Date().setDate(new Date().getDate()-7) : "";
    const filter_learning = document.getElementById('learning_filter').classList.contains('filter_selected')? "Обучение": "";
    fetch(url)
    .then(res => res.text())
    .then(rep => {
        const data2 = JSON.parse(rep.substr(47).slice(0,-2));
        let data3=data2;
        data3 = filter_man !=="" ?  data3.table.rows.filter((el)=>el.c[5].v===filter_man): data3.table.rows.filter((el)=>el.c[5].v!=="zaty4ka");
        data3 = filter_hospital !=="" ? data3.filter((el)=>el.c[2].v===filter_hospital): data3.filter((el)=>el.c[2].v!=="zaty4ka");
        data3 = filter_instrument !==""? data3.filter((el)=>el.c[3].v.includes(filter_instrument)): data3.filter((el)=>el.c[3].v!=='zaty4ka');
        data3 = filter_week !==""? data3.filter((el)=>new Date(el.c[1].v.split('Date(')[1].split(')')[0].split(',')[0],el.c[1].v.split('Date(')[1].split(')')[0].split(',')[1],el.c[1].v.split('Date(')[1].split(')')[0].split(',')[2])>filter_week): data3;
        data3 = filter_learning !==""? data3.filter((el)=>el.c[9].v===filter_learning): data3.filter((el)=>el.c[9].v!=='zaty4ka');
        const length = data3.length;
        const localUser = localStorage.getItem('user');
        for (let i=0; i<length; i+=1) {
            (data3[i].c[0] && data3[i].c[0].v != null) ? date1.push(data3[i].c[0].v.split('Date(')[1].split(')')[0]) : date1.push('');
            (data3[i].c[1] && data3[i].c[1].v != null) ? date2.push(data3[i].c[1].v.split('Date(')[1].split(')')[0]) : date2.push('');
            (data3[i].c[2] && data3[i].c[2].v != null) ? place.push(data3[i].c[2].v) : place.push('');
            (data3[i].c[3] && data3[i].c[3].v != null) ? machine.push(data3[i].c[3].v) : machine.push('');
            (data3[i].c[4] && data3[i].c[4].v != null) ? sn.push(data3[i].c[4].v) : sn.push('');
            (data3[i].c[5] && data3[i].c[5].v != null) ? applicator.push(data3[i].c[5].v) : applicator.push('');
            (data3[i].c[6] && data3[i].c[6].v != null) ? why.push(data3[i].c[6].v) : why.push('');
            (data3[i].c[7] && data3[i].c[7].v != null) ? done.push(data3[i].c[7].v) : done.push('');
            (data3[i].c[8] && data3[i].c[8].v != null) ? file.push(data3[i].c[8].v) : file.push('');
            (data3[i].c[10] && (data3[i].c[10].v == localUser) || localUser=='admin') ? deleteRow.push("X") : deleteRow.push('');
        }
        const table = document.createElement('table');
        table.className = 'supertable';
        const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const players_column_width = (width - 50) / 10;
        for (let i=0; i<length+1; i+=1) {
            const tr = table.insertRow();
            tr.className = 'superrow';
            for (let j=0; j<=10; j+=1) {
                const td = tr.insertCell();
                if (i===0 && j>0 && j<10) td.appendChild(document.createTextNode(`${data2.table.cols[j-1].label}`));
                if (i===0 && j==10) td.appendChild(document.createTextNode('Удаление / Изменение'));
                if (j===0) {
                    td.className = 'ordercell';
                    td.classList.add('hide_column');
                    if (i>0) td.appendChild(document.createTextNode(`${i}`))
                } else {
                    td.className = 'supercell';
                    td.style.width = (j===1||j===2||j===4||j===5||j===6||j===9||j===10)? `${players_column_width*0.5}px`:  `${players_column_width*1.4}px`;
                    if (j===2|| j===5||j===6|| j===8|| j===9) td.classList.add('hide_column');
                    if (j===1 && i>0) {
                        td.appendChild(document.createTextNode(`${new Date(date1[i-1].split(',')[0],date1[i-1].split(',')[1],date1[i-1].split(',')[2]).toLocaleString('ru-RU', {year: 'numeric', month: '2-digit', day: '2-digit'})}`))
                    } else if (j===2 && i>0) {
                        td.appendChild(document.createTextNode(`${new Date(date2[i-1].split(',')[0],date2[i-1].split(',')[1],date2[i-1].split(',')[2]).toLocaleString('ru-RU', {year: 'numeric', month: '2-digit', day: '2-digit'})}`))
                    } else if (j===3 && i>0) {
                        td.appendChild(document.createTextNode(`${place[i-1]}`))
                    } else if (j===4 && i>0) {
                        td.appendChild(document.createTextNode(`${machine[i-1]}`))
                    } else if (j===5 && i>0) {
                        td.appendChild(document.createTextNode(`${sn[i-1]}`))
                    } else if (j===6 && i>0) {
                        td.appendChild(document.createTextNode(`${applicator[i-1]}`))
                    } else if (j===7 && i>0) {
                        td.appendChild(document.createTextNode(`${why[i-1]}`))
                    } else if (j===8 && i>0) {
                        td.appendChild(document.createTextNode(`${done[i-1]}`))
                    } else if (j===9 && i>0) {
                        td.appendChild(document.createTextNode(`${file[i-1]}`))
                    } else if (j===10 && i>0) {
                        if(deleteRow[i-1]=='X') { 
                            const deleteIcon = document.createElement('img');
                            deleteIcon.src = './deleteIcon2.png';
                            deleteIcon.classList.add('clickable');
                            deleteIcon.classList.add('icon');
                            deleteIcon.id = `img_${i}`;
                            deleteIcon.width= 20;
                            deleteIcon.addEventListener('click', (e)=>{deleteVisitRow(e)})
                            td.appendChild(deleteIcon)
                            const editIcon = document.createElement('img');
                            editIcon.src = './editIcon.png';
                            editIcon.classList.add('clickable');
                            editIcon.classList.add('icon');
                            editIcon.id = `img_edit_${i}`;
                            editIcon.width= 20;
                            editIcon.addEventListener('click', (e)=>{editVisitRow(e)})
                            td.appendChild(editIcon)
                        }
                    }
                };
            }
        }
        document.getElementById('table_field').appendChild(table);
    })
}

function deleteVisitRow(e) {
    const row_number = e.target.id.split('img_')[1];
    const row_info = document.getElementById('table_field').querySelectorAll('.superrow')[row_number];
    const date1 = new Date(`${row_info.querySelectorAll('.supercell')[0].innerText.split('.')[2]}`,`${row_info.querySelectorAll('.supercell')[0].innerText}`.split('.')[1]-1,`${Number(row_info.querySelectorAll('.supercell')[0].innerText.split('.')[0])+1}`).toISOString().split('T')[0];
    const date2 = new Date(`${row_info.querySelectorAll('.supercell')[1].innerText.split('.')[2]}`,`${row_info.querySelectorAll('.supercell')[1].innerText}`.split('.')[1]-1,`${Number(row_info.querySelectorAll('.supercell')[1].innerText.split('.')[0])+1}`).toISOString().split('T')[0];
    const id = `${date1.replace(/[\.]/gi,'-')}_${date2.replace(/[\.]/gi,'-')}_${row_info.querySelectorAll('.supercell')[2].innerText}_${row_info.querySelectorAll('.supercell')[3].innerText}_${row_info.querySelectorAll('.supercell')[5].innerText}`
    fetch(`https://sheetdb.io/api/v1/tkhtt2o9c61js/id/${id}?sheet=visits`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.text())
    .then(rep => {
        setTimeout(()=>{
           window.location.reload(); 
        },1500)
    })
}

function editVisitRow(e) {
    const row_number = e.target.id.split('img_edit_')[1];
    const row_info = document.getElementById('table_field').querySelectorAll('.superrow')[row_number];
    const date1 = new Date(`${row_info.querySelectorAll('.supercell')[0].innerText.split('.')[2]}`,`${row_info.querySelectorAll('.supercell')[0].innerText}`.split('.')[1]-1,`${Number(row_info.querySelectorAll('.supercell')[0].innerText.split('.')[0])+1}`).toISOString().split('T')[0];
    const date2 = new Date(`${row_info.querySelectorAll('.supercell')[1].innerText.split('.')[2]}`,`${row_info.querySelectorAll('.supercell')[1].innerText}`.split('.')[1]-1,`${Number(row_info.querySelectorAll('.supercell')[1].innerText.split('.')[0])+1}`).toISOString().split('T')[0];
    const id = `${date1.replace(/[\.]/gi,'-')}_${date2.replace(/[\.]/gi,'-')}_${row_info.querySelectorAll('.supercell')[2].innerText}_${row_info.querySelectorAll('.supercell')[3].innerText}_${row_info.querySelectorAll('.supercell')[5].innerText}`
    document.getElementById('visits_list').classList.add('hide');
    document.getElementById('visit_box').classList.remove('hide');
    document.getElementById('save_edit_visit').classList.remove('hide');
    fetch(`https://sheetdb.io/api/v1/tkhtt2o9c61js/search?id=${id}`)
    .then((response) => response.json())
    .then((data) => {
        document.getElementById('date').value = data[0].Date_from;
        document.getElementById('date2').value = data[0].Date_to;
        const applicator = document.getElementById('application');
        const facility = document.getElementById('facility');
        const instrument = document.getElementById('instrument');
        for (let i=0; i< applicator.options.length; i+=1) {
            if (applicator.options[i].value == data[0].Application) applicator.selectedIndex = i;
        }
        for (let i=0; i< facility.options.length; i+=1) {
            if (facility.options[i].value == data[0].Facility) facility.selectedIndex = i;
        }
        for (let i=0; i< instrument.options.length; i+=1) {
            if (data[0].Instrument.split(',').indexOf(instrument.options[i].value)!== -1) instrument.options[i].setAttribute('selected', 'selected');
        }
        document.getElementById('sn').value = data[0].SN;
        document.getElementById('reason').value = data[0].Reason;
        document.getElementById('work').value = data[0].Works;
        const report = document.getElementById('report');
        const visit_type = document.getElementById('visit_type');
        for (let i=0; i< report.options.length; i+=1) {
            if (report.options[i].value == data[0].Report) report.selectedIndex = i;
        }
        for (let i=0; i< visit_type.options.length; i+=1) {
            if (visit_type.options[i].value == data[0].Work_type) visit_type.selectedIndex = i;
        }
        document.getElementById('id_info').innerText = data[0].id;
    });
    
}
document.getElementById('save_edit_project_main').addEventListener('click',confirmEditVisit);
function confirmEditVisit() {
    const id = document.getElementById('id_info').innerText;
    const date = document.getElementById('date').value;
    const date2 = document.getElementById('date2').value;
    const application = document.getElementById('application').value;
    const facility = document.getElementById('facility').value;
    const instrument = [];
    const x = document.getElementById('instrument');
    for (let i=0; i<x.options.length; i++){
        if(x.options[i].selected == true) {
            instrument.push(x.options[i].value)
        }
    }
    const sn = document.getElementById('sn').value;
    const reason = document.getElementById('reason').value;
    const work = document.getElementById('work').value;
    const report = document.getElementById('report').value;
    const type = document.getElementById('visit_type').value;
    if (date === "") document.getElementById('confirmation_status').innerText='Выберите дату начала';
    else if (date2 === "") document.getElementById('confirmation_status').innerText='Выберите дату конца визита';
    else if (application === "") document.getElementById('confirmation_status').innerText='Выберите аппликатора';
    else if (facility === "") document.getElementById('confirmation_status').innerText='Выберите учреждение';
    else if (instrument.length === 0) document.getElementById('confirmation_status').innerText='Выберите прибор(ы)';
    else if (reason === "") document.getElementById('confirmation_status').innerText='Укажите причину выезда';
    else if (work === "") document.getElementById('confirmation_status').innerText='Укажите выполненные работы';
    else if (report === "") document.getElementById('confirmation_status').innerText='Выберите статус акта';
    else if (type === "") document.getElementById('confirmation_status').innerText='Выберите тип выезда';
    else {
        document.getElementById('confirmation_status').classList.remove('red_status');
        document.getElementById('confirmation_status').classList.add('green_status');
        document.getElementById('confirmation_status').innerText='Выезд добавляется в базу';
        downloadEditedVisitToDatabase(date, date2, application, facility, instrument, sn, reason, work, report, type, id);
    }
}
function downloadEditedVisitToDatabase(date, date2, application, facility, instrument, sn, reason, work, report, type, id) {
    if (type=="Обучение") {
        fetch(`https://sheetdb.io/api/v1/tkhtt2o9c61js/id/${id}?sheet=visits`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({
                data:{
                    'Date_from': `${date}`,
                    'Date_to': `${date2}`,
                    'Facility': `${facility}`,
                    'Instrument': `${instrument}`,
                    'SN': `${sn}`,
                    'Application': `${application}`,
                    'Author': `${localStorage.getItem('user')}`,
                    'id': `${date}_${date2}_${facility}_${instrument}_${application}`,
                }
            })
        }) 
    }
    fetch(`https://sheetdb.io/api/v1/tkhtt2o9c61js/id/${id}?sheet=visits`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data:{
                'Date_from': `${date}`,
                'Date_to': `${date2}`,
                'Facility': `${facility}`,
                'Instrument': `${instrument}`,
                'SN': `${sn}`,
                'Application': `${application}`,
                'Reason': `${reason}`,
                'Works': `${work}`,
                'Report': `${report}`,
                'Work_type': `${type}`,
                'Author': `${localStorage.getItem('user')}`,
                'id': `${date}_${date2}_${facility}_${instrument}_${application}`,
            }  
        })
    })
    .then(res => res.text())
    .then(rep => {
        document.getElementById('confirmation_status').innerText='Выезд добавлен в базу';
        setTimeout(()=>{
           window.location.reload(); 
        },1500)
    })
}


// document.getElementById('popup_close').addEventListener('click', ()=>{document.getElementById('popup').classList.add('hide')})
// document.getElementById('myTopnav').addEventListener('click', ()=>{document.getElementById('popup').classList.add('hide')})

//Latron 64606;1.0;103156110;2021-06-04;26.8;2.0;7.0;28.0;2.0;10.0;119.0;9.0;13.0;156.0;9.0;9.0;75.0;6.0;9.0;109.0;6.0;9.0;144.0;8.0;9.0;25.9;2.0;7.0;25.2;2.0;10.0;158.0;12.0;13.0;156.0;9.0;9.0;204.0;10.0;9.0;204.0;10.0;9.0;204.0;10.0;9.0;34.4;2.5;7.0;34.4;2.5;10.0;119.0;9.0;13.0;156.0;9.0;9.0;209.0;11.0;9.0;209.0;11.0;9.0;209.0;11.0;9.0;26.8;1.0;7.0;033;D13;

