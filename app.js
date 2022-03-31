const btnEntrar = document.getElementById('btnEntrar')
const documentNumber = document.getElementById('jaFrmRegVacTxtNumDoc')

btnEntrar.addEventListener('click', () => {validar()})

const validar = () => {
    //const keys = "key" + documentNumber.value
    //localStorage.removeItem('keys');
    localStorage.setItem('keys', documentNumber.value)
}

