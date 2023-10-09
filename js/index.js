// mobile menu bar functionality start
let menuBtn = document.querySelector(".status-btns .fa-bars");
let mobileNavBar = document.querySelector(".navigation-links-mobile")
menuBtn.addEventListener("click", () => {
    mobileNavBar.classList.toggle("active")
})
// mobile menu bar functionality End


// Hero Page Aniumation start
let text = document.querySelector('.hero-text');
let img1 = document.querySelector('.hero-icon > img');
let img2 = document.querySelector('.hero-icon > img:nth-child(2)');
let img3 = document.querySelector('.hero-icon > img:nth-child(3)');
let img4 = document.querySelector('.hero-icon > img:nth-child(4)');
let img5 = document.querySelector('.hero-icon > img:nth-child(5)');
let img6 = document.querySelector('.hero-icon > img:nth-child(6)');
let mob1 = document.querySelector('.hero-mobile-images img:nth-child(1)');
let mob2 = document.querySelector('.hero-mobile-images img:nth-child(2)');
let mob3 = document.querySelector('.hero-mobile-images img:nth-child(3)');


window.addEventListener('scroll', () => {
    let value = window.scrollY;
    if (value <= 250) {
        mob1.style.marginRight = value + (-10) + 'px';
        mob3.style.marginLeft = value + (-10) + 'px';
    }
    text.style.marginTop = -value + 50 + 'px';

    img1.style.left = -value + 310 + 'px';
    img1.style.bottom = value + 120 + 'px';

    img2.style.top = value + 100 + 'px';
    img2.style.right = value + 180 + 'px';

    img3.style.bottom = value + 100 + 'px';
    img3.style.right = value + 180 + 'px';

    img4.style.top = -value + 78 + 'px';
    img4.style.right = -value + 345 + 'px';

    img5.style.top = value + 270 + 'px';
    img5.style.left = value + 400 + 'px';

    img6.style.top = -value + 100 + 'px';
    img6.style.left = -value + 300 + 'px';
})
// Hero Page Aniumation End


// Testimonial Start
var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 10,
        stretch: 0,
        depth: 150,
        modifier: 1,
        slideShadows: true,
    },
    loop: true,
});
// Testimonial End


// feedback form Code start====================
let userAuthToken = localStorage.getItem("localAccessToken") || null;
let feedback_data = JSON.parse(localStorage.getItem("feedback_d")) || [];
const form = document.getElementById('feedbackForm');


let url = 'https://mm-money-mingle.onrender.com/feedback_details/';
let i = 0;
form.addEventListener('submit', function (event) {
    event.preventDefault();


    i++;
    const formData = new FormData(form);
    let feedback = {
        "cust_id": i,
    };
    for (let [key, value] of formData) {
        feedback[key] = value;
    }
    feedback_data.push(feedback);
    localStorage.setItem("feedback_d", JSON.stringify(feedback_data));
    form.reset();
    swal("Thank You For Giving Feedback!")
});


// feedBack form open close section start
let feedBackFormBtn = document.querySelector('.feedback-form-icon');
let feedBackForm = document.querySelector('.feedback-form');
let feedBackFormCloseBtn = document.querySelector('#Feed_container > i');
let formSubmitCloseBtn = document.querySelector('.form-btn');

feedBackFormBtn.addEventListener("click", () => {
    feedBackForm.classList.add('active');
    feedBackFormBtn.style.display = "none";

})
feedBackFormCloseBtn.addEventListener("click", () => {
    feedBackForm.classList.remove('active');
    feedBackFormBtn.style.display = "initial";

})
// feedBack form open close section end



// feedback form Code End=========================





// =========================================Login Pop-On Code Start============================

// hide show password function Start
const pass = document.querySelector("#password")
const hideEye = document.querySelectorAll(".fa-eye-slash")
hideEye.forEach((i) => {
    i.addEventListener("click", () => {
        if (pass.type === "password") {
            pass.type = "text"
        } else {
            pass.type = "password"
        }
        if (i.classList[1] === "fa-eye-slash") {
            i.classList.remove("fa-eye-slash")
            i.classList.add("fa-eye")
        } else {
            i.classList.remove("fa-eye")
            i.classList.add("fa-eye-slash")
        }
    })
})
// hide show password function End



// ==========form Data start============
let statusBtns = document.querySelector('.status-btns a')
let formLocalData = JSON.parse(localStorage.getItem("form-data")) || []
let LogInform = document.querySelector(".form-container")
let loginPage = document.querySelector('.login-page');
let loginCloseBtn = document.querySelector('.login-page .fa-x');


statusBtns.addEventListener('click', (e) => {
    e.preventDefault();
    LogInform.classList.add('active');
    loginPage.classList.add('active');
})
loginCloseBtn.addEventListener('click', () => {
    LogInform.classList.remove('active');
    loginPage.classList.remove('active');
})


async function LoginFetchData() {
    try {
        let res = await fetch(`https://nearsteeluserdata.onrender.com/user`);
        let data = await res.json();
        LogInform.addEventListener('submit', (e) => {
            e.preventDefault();
            LoginUser(data)
        });
    }
    catch (err) {
        console.log("Login Form Error: " + err);
    }
}
LoginFetchData()

let userLogInStatus = JSON.parse(localStorage.getItem("userLogInStatus")) || []
function LoginUser(data) {
    let isLoggedIn = false;
    data.forEach(user => {
        if (user.usrName === LogInform.userName.value) {
            if (user.password === LogInform.password.value) {
                isLoggedIn = true;
                let isDuplicate = userLogInStatus.some(existingItem => existingItem.id === user.userId)
                if (!isDuplicate) {
                    userLogInStatus.push({ userId: user.id, status: true, name: user.name });
                    localStorage.setItem('userLogInStatus', JSON.stringify(userLogInStatus))
                }
            }
            else {
                swal("Wrong password!", "", "error");
            }
        } else {
            swal("Wrong User Name!", "", "error");
        }

        if (isLoggedIn) {
            if(LogInform.userName.value =="admin"){
                swal("Login successful!", "Welcome to MonneyMingle ;)", "success");
                setTimeout(() => {
                    window.location.href = "admin.html";
                }, 1000);
            }else{
                swal("Login successful!", "Welcome to MonneyMingle ;)", "success");
                setTimeout(() => {
                    window.location.href = "user.html";
                }, 1000);
            }
            
        }
        else {
            swal("Invalid username!", "", "error");
        }
    });

}
// =========form Data End======

const button = document.querySelector(".button");
button.addEventListener("click", (e) => {
    e.preventDefault;
    button.classList.add("animate");
    setTimeout(() => {
        button.classList.remove("animate");
    }, 600);
});

// ==========================================Login Pop-On Code End=========





// ------------------Money Converter--------------------------------

// ----------------------Options----------------------------------------
function con() {
    fetch("https://mm-money-mingle.onrender.com/country_data")
      .then(response => response.json())
      .then(data => {
        const countries = data;
        // console.log(data);
        const fromCurrencySelect = document.getElementById("fromMoney");
        const toCurrencySelect = document.getElementById("toMoney");
  
        countries.forEach(({ id, name, currency_code }) => {
  
          const option = document.createElement("option");
          option.value = id;
          option.textContent = `${name} (${currency_code})`;
  
          fromCurrencySelect.appendChild(option.cloneNode(true));
          toCurrencySelect.appendChild(option);
        });
      })
      .catch(error => {
        console.log("Failed to fetch country data.", error);
      });
  }
  con();

// ----------------------Options----------------------------------------
// -----------------flag icon-----------------------------------------------
let f1 = document.getElementById('flag1');
let f2 = document.getElementById('flag2');
document.getElementById("fromMoney").addEventListener('change', () => {

    document.getElementById("amount").value = 0;
    document.getElementById("result").value = 0;
  
    let fromMoney = Number(document.getElementById("fromMoney").value);
    const endpoint = `https://mm-money-mingle.onrender.com/country_data`;
  
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        data.forEach(({ id, image }) => {
          if (id === fromMoney) {
            f1.setAttribute("src", image);
          }
        });
      })
      .catch(error => {
        console.log("Failed to fetch Flag1.", error);
      });
  
  
  });
  
  
  document.getElementById("toMoney").addEventListener('change', () => {
  
    let toMoney = Number(document.getElementById("toMoney").value);
  
    const endpoint = `https://mm-money-mingle.onrender.com/country_data`;
  
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        data.forEach(({ id, image }) => {
          if (id === toMoney) {
            f2.setAttribute("src", image);
          }
        });
      })
      .catch(error => {
        console.log("Failed to fetch Flag 2", error);
      });
  
  
  })
// -----------------flag icon-----------------------------------------------

function convertMoney() {
    let amount = Number(document.getElementById("amount").value);
    console.log(typeof (amount));
  
    let fromMoney = Number(document.getElementById("fromMoney").value);
    let toMoney = Number(document.getElementById("toMoney").value);
  
    const endpoint = `https://mm-money-mingle.onrender.com/country_data`;
  
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
  
  
        //console.log(data,fromMoney,toMoney);
  
        let r1 = 0, r2 = 0, c1 = "", c2 = "", res = 0;
        data.forEach(({ id, currency_rate, currency_code }) => {
  
  
          if (id === fromMoney) {
  
            r1 = currency_rate;
            c1 = currency_code;
            console.log("r1", currency_rate, typeof (currency_rate), r1)
          }
          if (id === toMoney) {
  
            r2 = currency_rate;
            c2 = currency_code;
            console.log("r2", currency_rate, typeof (currency_rate), r2)
          }
  
  
          if (fromMoney > toMoney) {
            // let x=amount / rates[fromMoney];
            res = Number(amount) / r1;
            res = Number.parseFloat(res).toFixed(4)
          }
          else if (fromMoney < toMoney) {
            res = Math.abs(amount * r2);
            res = Number.parseFloat(res).toFixed(4)
          }
          else if (fromMoney == toMoney) {
            res = Math.abs(amount);
            res = Number.parseFloat(res).toFixed(4)
          }
          // let x=(amount * rates[toMoney] * 100) / 100;
          document.getElementById("amount").value = `${amount} ${c1}`
          document.getElementById("result").value = `${res} ${c2}`;
  
        //   let temp1, temp2;
  
  
  
        //   if (r1 <= r2) {
        //     let y = Math.abs((1 * r2));
        //     temp1 = Number.parseFloat(y).toFixed(4);
  
  
        //     let z = Math.abs((1 / r2));
        //     temp2 = Number.parseFloat(z).toFixed(4);
  
        //   }
        //   else {
        //     let y = Math.abs(1 / r2 / 100);
        //     temp1 = Number.parseFloat(y).toFixed(4);
  
        //     let z = Math.abs((1 * r1));
        //     temp2 = Number.parseFloat(z).toFixed(4);
  
  
        //   }
  
  
  
        //   document.getElementById("result2").textContent = `1 ${c1} = ${temp1} ${c2}  And
        //   1 ${c2} = ${temp2} ${c1}`;
  
  
        //   head1.innerHTML = `Convert ${c1} to ${c2}`
        //   table_1.innerHTML = `<ul>
        //       <li>1 ${c1}<span>${Math.floor(temp1)} ${c2}</span></li>
        //       <li>5 ${c1}<span>${Math.floor(5 * temp1)} ${c2}</span></li>
        //       <li>10 ${c1}<span>${Math.floor(10 * temp1)} ${c2}</span></li>
        //       <li>25 ${c1}<span>${Math.floor(25 * temp1)} ${c2}</span></li>
        //       <li>50 ${c1}<span>${Math.floor(50 * temp1)} ${c2}</span></li>
        //       <li>100 ${c1}<span>${Math.floor(100 * temp1)} ${c2}</span></li>
        //       <li>500 ${c1}<span>${Math.floor(500 * temp1)} ${c2}</span></li>
        //  </ul>`
  
  
        //   head2.innerHTML = `Convert ${c2} to ${c1}`
        //   table_2.innerHTML = `
        // <ul>
        //       <li>1 ${c2}<span>${Math.floor(temp2)} ${c1}</span></li>
        //       <li>5 ${c2}<span>${Math.floor(5 * temp2)} ${c1}</span></li>
        //       <li>10 ${c2}<span>${Math.floor(10 * temp2)} ${c1}</span></li>
        //       <li>25 ${c2}<span>${Math.floor(25 * temp2)} ${c1}</span></li>
        //       <li>50 ${c2}<span>${Math.floor(50 * temp2)} ${c1}</span></li>
        //       <li>100 ${c2}<span>${Math.floor(100 * temp2)} ${c1}</span></li>
        //       <li>500 ${c2}<span>${Math.floor(500 * temp2)} ${c1}</span></li>
        //  </ul>`
  
  
  
        });
  
      })
      .catch(error => {
        console.log("Failed to fetch exchange rates.", error);
      });
  }