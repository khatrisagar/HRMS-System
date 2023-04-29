// let submit_btn  = document.getElementById("submit_btn");
// submit_btn.disabled=true;
// submit_btn.style="opacity: 0.5"


const confirmPassword = () => {

    let password = document.getElementById("Password").value;
    let Cpassword = document.getElementById("Cpassword").value;

    let passvalid = document.getElementById("passvalid");

    if (password == Cpassword) {
        passvalid.innerHTML = "";
        changBtnStatus()
      

    } else {
        passvalid.innerHTML = "password does'nt match";
        document.getElementById("passvalid").style.color = 'red';
      
    }

}

const passwordError = () => {
    let newPassword = document.getElementById('Password').value;
    let passwordErr = document.getElementById("passwordErr");
    
    let minNumberofChars = 6;
    let maxNumberofChars = 16;
    let regularExpression = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (newPassword == "" || !regularExpression.test(newPassword)) {
       
        passwordErr.innerHTML = "Password should contain atleast 6 length";
        passwordErr.style.color = 'red';
       
    } else {
        passwordErr.innerHTML = "";
        changBtnStatus()
        
      
    }
}



const emailCorrect = () => {
    
    let regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    let email = document.getElementById('email').value;
    let emailErr = document.getElementById("emailErr");

    fetch('/get-allUsersEmail')
    .then(res=>res.json())
    .then((emails) => {
        if(emails.includes(email))
        {
            emailErr.innerHTML = 'user already exists';    
        }
        else{
            emailErr.innerHTML = '';    
        }

    })

    if (email == "" || !regex.test(email)) {
        
        emailErr.innerHTML = 'Email is invalid';
        emailErr.style.color = 'red';
            submit_btn.disabled=true;
            submit_btn.style="opacity: 0.5"
            return false;
        
    } else {
        emailErr.innerHTML = '';
        changBtnStatus()
       
    }
}

const changBtnStatus = () => {
    let passvalid = document.getElementById("passvalid").innerHTML;
    let passwordErr = document.getElementById("passwordErr").innerHTML;
    let emailErr = document.getElementById("emailErr").innerHTML;
   
    if(passvalid=="" && passwordErr=="" &&emailErr=="")
    {
        submit_btn.disabled=false;
        submit_btn.style="opacity: 1"
    }
    else{
        submit_btn.disabled=true;
        submit_btn.style="opacity: 0.5"
    }
}

  
function eye(togglePassword){
        const x = document.getElementById("Password")
        if (x.type === "password") {
            x.type = "text";
            togglePassword.classList="fa-sharp fa-solid fa-eye-slash"
            
        } else {
            x.type = "password";
        };
}
function eyeout(togglePassword){
     const x = document.getElementById("Password")
        if (x.type === "text") {
            x.type = "password";
            togglePassword.classList="fa-solid fa-eye"
        } else {
            x.type = "text";
        }
}

async function getIP() {
    try{
      const resposne = await fetch('https://api.ipify.org/?format=json')
      const userIP = await resposne.json()
      document.getElementById('ip').innerHTML = `<input type="hidden" value="${userIP.ip}" name="userIP" id="user_IP"/>`
    }
    catch(err){
        console.log("err", err)
    }
}



 async function verifyIP(event){
     event.preventDefault()


    

    const alertFire = Swal.mixin({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,

        timer: 3000,

        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

     await getIP()
    
    const user_email = document.querySelector('#user_email').value
    const user_password = document.querySelector('#Password').value
    const user_IP = document.querySelector('#user_IP').value

     try {
        const response = await fetch(`/post-login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({ user_email, user_password, user_IP })
        });

        const res = await response.json();

        if(res.ans === "login"){
            location.assign(`/get-login`);
            // alertFire.fire({
            //     icon: 'warning',
            //     title: res.message
            // })
        }
        if(res.ans === "err"){
            alertFire.fire({
                icon: 'warning',
                title: res.message
            })
        }
        if(res.ans === "get-employee-data"){
            location.assign(`/employee/get-employee-data`);
        }
        if(res.ans === "dashboard"){
            alertFire.fire({
                icon: 'success',
                title: "Login Successfully"
            })
            setTimeout(()=>{
                location.assign(`/dashbord`);
            },1000)
        }
        if(res.ans === "activate"){
            location.assign(`/get-activate`);
        }

    }
    catch(err){
        console.log("errrrr", err)
    }


    return false
}