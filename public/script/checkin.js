const tz = moment().utcOffset()
const checkIn = async() => {

    let res = await fetch("/checkin", {
        method: "post",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({

        })

    })

    let data = await res.json();
    if(data.isAlreadyCheckin)
    {
        alert("goli beta masti nay");
        location.reload();
    }

    document.getElementById("checkin").classList.toggle("btn-checkin1");
    document.getElementById("brakein").classList.toggle("btn-brakein1");
    document.getElementById("checkout").classList.toggle("btn-checkout1");

    document.getElementById("green").innerHTML += `<div class="check-green">
    <span ><label>Checked In :</label>${moment(data.checkindate).utcOffset(parseInt(tz)).format("hh:mm:ss")}  </span>

    </div>`

}

const checkOut = async() => {

    let res = await fetch("/checkout", {
        method: "post",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({

        })

    })
    let data = await res.json();
    // 
    
    if (confirm("Do you really want to checkout") == true) {
        document.getElementsByClassName("check-inout")[0].style.display = "none";
        document.getElementsByClassName("check-inout")[0].innerHTML = "none";

        document.getElementById("green").innerHTML += `  <div class="check-red">
        <span ><label > Check Out :</label>${moment(data.checkoutdata).utcOffset(parseInt(tz)).format("hh:mm:ss")}</span>
    </div>`
    } else {
        return false
    }
}
//



const brakeOut = async() => {


    let res = await fetch("/brakeout", {
        method: "post",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({

        })

    })

    let data = await res.json();

    document.getElementById("brakein").classList.toggle("btn-brakein1");
    document.getElementById("checkout").classList.toggle("btn-checkout1");
    document.getElementById("brakeout").classList.toggle("btn-brakeout1");


    document.getElementById("green").innerHTML += `  <div class="check-yellow">
    <span ><label >Break Out :</label> ${moment(data.breakoutdate).utcOffset(tz).format("hh:mm:ss")}</span>
    </div>`

}



const brakeIn = async() => {
    
    if (confirm("Do you really want to break in") == true) {    
    

    let res = await fetch("/brakein", {
        method: "post",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({

        })

    })

    let data = await res.json();
    if(data.isAlreadyBrakein)
    {
        console.log("if",data.isAlreadyBrakein)
        alert("goli beta masti nay");
        location.reload();
        return;
    }

   
        document.getElementById("brakein").classList.toggle("btn-brakein1");
        document.getElementById("checkout").classList.toggle("btn-checkout1");
        document.getElementById("brakeout").classList.toggle("btn-brakeout1");
        document.getElementById("green").innerHTML += `  <div class="check-orange">
        <span ><label > Break In :</label> ${moment(data.brakeindate).utcOffset(tz).format("hh:mm:ss") }</span>
    </div>`

    } else {
        return false
    }

}






const handelPageLoad = () => {
    document.getElementById("Time").innerHTML = new Date().toLocaleTimeString();
    document.cookie = `tz=${tz}`;
    setInterval(() => {
        time = new Date();
        let t = time.toLocaleTimeString();

        document.getElementById("Time").innerHTML = t;

    }, 1000);

    const currentDate = moment().format("YYYY-MM-DD");
    document.getElementById('date').innerText = currentDate

    let emp_id = document.getElementById("emp_id").value;

   
    fetch(`/dashbord/getCkeckInOutInfo?emp_id=${emp_id}&date=${currentDate}`)
        .then(res => res.json())
        .then(async (data) => {
            
            if (data[0].checkin_time) {
                document.getElementById("green").innerHTML += ` <div class="check-green">
                        <span ><label>Checked In :</label>${moment(data[0].checkin_time).utcOffset(tz).format("hh:mm:ss")}  </span>
                        </div>`;
                document.getElementById("checkin").classList.toggle("btn-checkin1");
                document.getElementById("brakein").classList.toggle("btn-brakein1");
                document.getElementById("checkout").classList.toggle("btn-checkout1");

            }

             await fetch(`/dashbord/getBrakeInfo?emp_id=${emp_id}&date=${currentDate}`)
            .then(res => res.json())
            .then((data) => {
                for (x of data) {
    
                    if (x.brakein_time) {
                        document.getElementById("brakein").classList.toggle("btn-brakein1");
                        document.getElementById("checkout").classList.toggle("btn-checkout1");
                        document.getElementById("brakeout").classList.toggle("btn-brakeout1");
    
                        document.getElementById("green").innerHTML += `  <div class="check-orange">
                        <span ><label > Break In :</label> ${moment(x.brakein_time).utcOffset(tz).format("hh:mm:ss")}</span>
                        </div>`;
                    }
                    
                    if (x.brakeout_time) {
                        document.getElementById("brakein").classList.toggle("btn-brakein1");
                        document.getElementById("checkout").classList.toggle("btn-checkout1");
                        document.getElementById("brakeout").classList.toggle("btn-brakeout1");
    
                        document.getElementById("green").innerHTML += `  <div class="check-yellow">
                        <span ><label >Break Out :</label> ${moment(x.brakeout_time).utcOffset(tz).format("hh:mm:ss")}</span>
                        </div>`
                    }
    
    
                }
            })

            if (data[0].checkout_time) {

                document.getElementsByClassName("check-inout")[0].style.display = "none";

                document.getElementById("green").innerHTML += `<div class="check-red">
                    <span ><label > Check Out :</label>${moment(data[0].checkout_time).utcOffset(tz).format("hh:mm:ss")}</span>
                    </div>`;
            }


        })

}

// for comment 
const addCommentBtn = document.getElementById('add-comment-btn');
let commentContainer = document.getElementById('comment-container')


async function addComment() {
    var comment = document.getElementById('comment').value;
    comment = comment.toString()
    fetch(`/dashbord/get-comment?comment=${comment}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },

    }).then((res) => {}).then((res) => {
        console.log(res);
        var comment = document.getElementById('comment').value = "";

    });
    setTimeout( async()=>{
        await updateCommentCard()
    },100)
    // commentContainer.innerHTML += `<p>${comment}</p>`

    addCommentBtn.disabled = true
    addCommentBtn.style.opacity = 0.7

}


const updateCommentCard = async() => {
    commentContainer.innerHTML = ''
    await fetch(`/dashbord/updateCommentCard`)
        .then(res => res.json())
        .then(data => {
            data.forEach((singleComment) => {
                let p = document.createElement('p')
                p.innerText += `${singleComment.comment}`
                commentContainer.appendChild(p)
        })
    })
}

let comment = document.getElementById('comment');
const validateComment = () => {
    if (comment.value === "") {
        addCommentBtn.disabled = true
        addCommentBtn.style.backgroundColor = "var(--green-disable)"
    }
    if (comment.value != "") {
        addCommentBtn.disabled = false
        addCommentBtn.style.backgroundColor = "var(--green)"
    }
}