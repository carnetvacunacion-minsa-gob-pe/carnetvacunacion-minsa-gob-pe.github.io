const s_name = document.getElementById('span-name')
const s_birthdate = document.getElementById('span-birthdate')
const s_age = document.getElementById('span-age')
const s_img = document.getElementById('img1')

const templateVacunations = document.getElementById('template-vacunations').content
const fragment = document.createDocumentFragment()
const idVacunations = document.getElementById('vacunations')

let person = {}

document.addEventListener('DOMContentLoaded', () => {
    loadData()
});

const loadData = async () => {
    try {
        const res = await fetch('api.json');
        const data = await res.json()
        setData(data)
    } catch (error) {
        console.log(error)
    }
}

const setData = data => {
    documentNumber = localStorage.getItem('keys')
    data.forEach(persona => {
        if (persona.documentNumber === documentNumber) {
            person = {
                name: persona.name,
                birthdate: persona.birthdate,
                age: persona.age,
                img: persona.img
            }
            persona.dosis.forEach(dosi => {
                templateVacunations.querySelector('#dosisNumber').textContent = dosi.dosisNumber
                templateVacunations.querySelector('#dosisDate').textContent = dosi.date
                templateVacunations.querySelector('#dosisDescription').textContent = dosi.description
                templateVacunations.querySelector('#dosisPlace').textContent = dosi.place
                const clone = templateVacunations.cloneNode(true)
                fragment.appendChild(clone)
            })
            idVacunations.appendChild(fragment)
            let nodeLast = idVacunations.lastElementChild
            nodeLast.remove()
        }
    })
    let age = calculateEdad(person.birthdate)

    s_img.src = person.img;
    s_name.innerHTML = person.name
    s_birthdate.innerHTML = formatBirthDate(person.birthdate)
    s_age.innerHTML = age
}

const calculateEdad = birthdate => {
    let f1 = moment(birthdate);
    let f2 = moment();
    let diff = moment.preciseDiff(f1, f2, true);

    return `${diff.years} año(s) ${diff.months} mes(es) ${diff.days} día(s)`
}

const formatBirthDate = birthdate => {
    let date = new Date(birthdate)
    let days = date.getUTCDate();
    if (String(date.getUTCDate()).length === 1) {
        days = "0" + date.getUTCDate();
    }
    return `${days}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`
}