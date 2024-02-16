import { reward } from "./reward.js";
let currentReward = reward;

let navbar = document.querySelector(".navbar");
let navbar_mobile = document.querySelector(".navbar-mobile");
let btn_bookmark = document.getElementById("btn-bookmark");
let test = document.querySelector(".test");
let reward_parent = document.getElementById("reward-parent")
let project_item = document.getElementById("project-item");
let bg_modal_navbar_mobile = document.querySelector(".bg-modal-navbar-mobile")
const open_navbar_icon = document.getElementById("open-navbar-icon");
let gotit_btn = document.querySelector(".gotit-btn");
let complete_modal = document.getElementById("complete-modal");
const close_modal = document.getElementById("close-modal");
const open_modal = document.getElementById("open-modal");
const total_backed = document.getElementById("total-backed")
const myFunction = (e) => {
  const inputPledge = e.target.getAttribute("data-pledge");
  const value = e.target.value;
  // console.log(value)
  console.log(e)
  if (Number(value) < Number(inputPledge)) {
    e.target.value = inputPledge
  }
}
const countProgress = (x) => {
  return x / 1000;
}
let stock = {}
let count = 1;
let id;
let progress;
let max = 100000;
const setTotalBacked = (x) => {
  let pattern = /\d+/g;
  let setNominal = Number(x.match(pattern).join(""));
  total_backed.innerText = `${new Intl.NumberFormat().format(setNominal + count)}`
}

const setProgres = (x) => {
  const nominal = document.getElementById("nominal");
  let pattern = /\d+/g;
  let setNominal = Number(nominal.innerText.match(pattern).join(""));
  nominal.innerText = `$${new Intl.NumberFormat().format(setNominal + x)}`
  test.style.width = `${countProgress(setNominal + x)}%`
}
const setReward = (id, stock) => {
  let stockValue;
  if (stock.a) {
    stockValue = stock.stock
  }
  let x = currentReward.map(x => {
    return x.rewardHeader === id ? { ...x, stock: stockValue ? Number(stockValue) : x.stock - 1 } : x
  });
  currentReward = x;
}
setProgres(0);
close_modal.onclick = () => {
  document.getElementById("project-modal").style.display = "none"
  document.body.style.overflow = "auto"
}
const test2 = (idx, x) => {
  const pledge_input = document.querySelectorAll(".pledge-input");
  let s = ".stock-xl"
  const stock = document.querySelectorAll(s);
  let stockValue = Number(stock[idx].firstElementChild.innerText)
  // console.log(stock)
  if (Number(x) < 0) {
    pledge_input[idx].stepDown(`${Number(x.split("-")[1])}`)
    if (pledge_input[idx].getAttribute("data-stock") != stockValue) {
      count -= 1
      stock[idx].firstElementChild.innerText = `${Number(stockValue + 1)}`
    }
    // console.log(`${x}`)
  } else {
    pledge_input[idx].stepUp(`${Number(x)}`)
    if (stockValue) {
      count += 1
      stock[idx].firstElementChild.innerText = `${Number(stockValue - 1)}`
    }
  }
}

gotit_btn.onclick = () => {
  complete_modal.style.display = "none";
  document.body.style.overflow = "auto"
  const myFunction = () => {
    setReward(id, stock);
    setProgres(progress);
    setTotalBacked(total_backed.innerText)
    count = 1
  }
  setTimeout(() => {
    myFunction()
    clearTimeout(myFunction)
  }, 1000)
}
let isNavbarMobileOpen = false;

open_navbar_icon.onclick = () => {
  isNavbarMobileOpen = !isNavbarMobileOpen;
  let imageSrc = isNavbarMobileOpen ? "./images/icon-close-menu.svg" : "./images/icon-hamburger.svg";
  let display = isNavbarMobileOpen ? "block" : "none";
  let overflow = isNavbarMobileOpen ? "hidden" : "auto"
  open_navbar_icon.src = imageSrc;
  bg_modal_navbar_mobile.style.display = display;
  document.body.style.overflow = overflow
}


open_modal.onclick = () => {
  let newdiv = document.createElement("div");
  document.body.style.overflow = "hidden"
  newdiv.id = "project-item";
  document.getElementById("project-item").replaceWith(newdiv)
  document.getElementById("project-modal").style.display = "block";
  stock = {}
  id = ""
  progress = ""
  const div = document.createElement("div");
  div.innerHTML =
    `
        <div class="project flex-column position-relative" style="margin-bottom: 22px">
        <div class="flex-items-start">
          <div class="border-modal-project"></div>
          <div class="flex-column margin-item">
            <div class="flex-between">
              <div class="text-modal-project available">
                <p style="margin: auto;" class="id-reward-header">
                  Pledge with no reward
                </p>
              </div>
              <div class="flex stock-xl" style="opacity:0;">
                <p style="font-weight: 700;font-size: 18px;" class="stock"></p>
                <p style="margin-left: 6px;">left</p>
              </div>
            </div>
            <div class="reward-description available-reward-description">
              <span>
                Choose to support us without a reward if you simply believe in our project. As a backer,
                you will be signed up to receive product updates via email
              </span>
            </div>
          </div>
        </div>
        <div class="flex-between-items-center flex-column-between-center-mb form-pledge">
          <div style="margin-left: auto;" class="flex-between-items-center inputs">
            <div class="flex-between-items-center inputs">
            <div class="text-input flex-items-center" style="opacity: 0;">
              <p>$</p>
                <input 
                  type="number" 
                  min="0" 
                  max="0" 
                  data-pledge=0 
                  data-stock=0
                  class="pledge-input" 
                  value=0 
                  onkeypress="return false;"
                >
              <div class="flex-column">
                <button class="steup">
                    <img src="./images/arrow-up.png" width="10">
                </button>
                <button class="stepdown" >
                    <img 
                      src="./images/arrow-up.png" 
                      width="10"
                      style="transform: rotate(180deg);"
                      >
                </button>
              </div>
            </div>      
            <div style="margin-left: auto;" class="buttons-pledge flex-between">
              <button class="btn-continue">Continue</button>
            </div>
          </div>
        </div>
      </div>
  `
  newdiv.appendChild(div);
  currentReward.forEach((x, idx) => {
    let { rewardHeader, pledge, rewardDescription, stock } = x
    const div = document.createElement("div");
    div.innerHTML =
      `
          <div class="project flex-column position-relative" style="margin-bottom: ${idx !== currentReward.length - 1 ? "22px" : "0"}">
          <div class="flex-items-start">
            <div class="border-modal-project"></div>
            <div class="${stock === 0 ? "bg-transparent" : ""}"></div>
            <div class="flex-column margin-item">
              <div class="flex-between">
                <div class="text-modal-project available">
                  <p class="id-reward-header" style="color:${stock === 0 ? "#7F7F7F" : ""};">
                    ${rewardHeader}
                  </p>
                  <p style="color: ${stock === 0 ? "#C3E8E2" : "#3cb4ac"}">
                    Pledge $${pledge} or more
                  </p>
                </div>
                ${document.body.clientWidth > 450 ?
                  `
                    <div class="flex stock-xl">
                      <p style="color: ${stock === 0 ? "#7F7F7F" : ""};font-weight: 700;font-size: 18px;" class="${stock === 0 ? "" : "stock"}">${stock}</p>
                      <p style="color: ${stock === 0 ? "#7F7F7F" : ""};margin-left: 6px;">left</p>
                    </div>
                  `
                  :""
                }
              </div>
              <div class="reward-description available-reward-description">
                <span>
                    ${rewardDescription}
                </span>
                ${document.body.clientWidth < 450 ?
                      `
                        <div class="flex stock-xl">
                          <p style="color: ${stock === 0 ? "#7F7F7F" : ""};font-weight: 700;font-size: 18px;" class="${stock === 0 ? "" : "stock"}">${stock}</p>
                          <p style="color: ${stock === 0 ? "#7F7F7F" : ""};margin-left: 6px;">left</p>
                        </div>
                      `
                      :""
                    }
              </div>
            </div>
          </div>
          <div class="flex-between-items-center flex-column-between-center-mb form-pledge">
          <span>Enter yout pledge</span>
          <div class="flex-between-items-center inputs">
          <div class="text-input flex-items-center">
          <p>$</p>
          <input 
            type="number" 
            min="${pledge}" 
            max="${pledge * stock}" 
            data-pledge=${pledge} 
            data-stock=${stock} 
            class="pledge-input" 
            value=${pledge} 
            onkeypress="return false;">
          <div class="flex-column">
            <button class="steup" onclick="test2(${idx}, '${pledge}')">
                <img src="./images/arrow-up.png" width="10">
            </button>
            <button class="stepdown" onclick="test2(${idx}, '-${pledge}')">
                <img 
                  src="./images/arrow-up.png" 
                  width="10"
                  style="transform: rotate(180deg);"
                >
            </button>
          </div>
        </div>
            <div class="buttons-pledge flex-between">
              <button class="btn-continue">Continue</button>
            </div>
          </div>
        </div>
 
        </div>
      `
    newdiv.appendChild(div)
  })
  const project = document.querySelectorAll(".project")
  const form_pledge = document.querySelectorAll(".form-pledge")
  const text_modal_project = document.querySelectorAll(".available");
  const border_modal_project = document.querySelectorAll(".border-modal-project")
  const pledge_input = document.querySelectorAll(".pledge-input");
  const btn_continue = document.querySelectorAll(".btn-continue");
  const steup = document.querySelectorAll(".steup");
  const stedown = document.querySelectorAll(".stepdown");
  const reward_description = document.querySelectorAll('.available-reward-description')
  let a = false;
  let height = []
  text_modal_project.forEach((elem, idx) => {
    let active = false;
    console.log(elem)
    elem.onmouseenter = () => {
      border_modal_project[idx].style.border = "1px solid #3cb4ac"
      elem.style.color = "#3cb4ac"
    }
    elem.onmouseleave = () => {
      if (!active) {
        border_modal_project[idx].style.border = "1px solid #808080"
        elem.style.color = "black";
      }
    }
    // console.log("TEST")
    let reward_descriptionHeight = Number(reward_description[idx].offsetHeight);
    // stock
    let projectHeight = Number(project[idx].offsetHeight);
    let formPledgeHeight = Number(form_pledge[idx].offsetHeight);
    height.push({
      projectHeight: document.body.clientWidth > 450 ? projectHeight : projectHeight + reward_descriptionHeight,
      formPledgeHeight: formPledgeHeight
    })
    project[idx].style.height = `${document.body.clientWidth > 450 ? projectHeight : projectHeight + reward_descriptionHeight}px`;
    form_pledge[idx].style.bottom = "-" + formPledgeHeight + "px"
    elem.onclick = () => {
      active = !active;
      text_modal_project.forEach((elem2, idx2) => {
        let a = (idx === idx2);
        let projectHeight2 = a ? `${height[idx2].projectHeight + height[idx2].formPledgeHeight}px` : `${height[idx2].projectHeight}px`
        let projectBoxShadow = a ? `rgba(0, 0, 0, 0.16) 0px 1px 4px, #3cb4ac 0px 0px 0px 3px` : `rgba(0, 0, 0, 0.02) 0px 1px 2px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px`
        let formPledgeBottom = a ? "0px" : `-${height[idx2].formPledgeHeight}px`
        let borderModalProject_border = a ? "1px solid #3cb4ac" : "1px solid #808080"
        let elemColor = a ? "#3cb4ac" : "black"
        project[idx2].style.height = projectHeight2
        const myFunction = () => {
          project[idx2].style.boxShadow = projectBoxShadow;
        }
        setTimeout(() => {
          myFunction();
          clearTimeout(myFunction())
        }, 200)
        form_pledge[idx2].style.bottom = formPledgeBottom;
        border_modal_project[idx2].style.border = borderModalProject_border;
        elem2.style.color = elemColor
        if (a) {
          border_modal_project[idx2].classList.add("border-modal-project-active")
        } else {
          border_modal_project[idx2].classList.remove("border-modal-project-active")
        }
      })
    }
  });

  btn_continue.forEach((elem, idx) => {
    elem.onclick = (e) => {
      const value = pledge_input[idx].value;
      let pattern = /\d+/g;
      let setNominal = Number(nominal.innerText.match(pattern).join(""));
      const idValue = document.querySelectorAll(".id-reward-header")[idx];
      const stockValue = document.querySelectorAll(".stock")[idx];
      //   console.log(id.innerText)
      console.log(stockValue)
      console.log(document.querySelectorAll(".stock"))
      stock = {
        stock: stockValue.innerText,
        a: a
      }
      console.log(stock);
      id = idValue.innerText
      progress = Number(value)
      console.log(setNominal + progress)
      if ((setNominal + progress) <= max) {
        complete_modal.style.display = "block"
        document.getElementById("project-modal").style.display = "none"
      } else {
        alert("Maximum")
      }
    }
  })
  steup.forEach((elem, idx) => {
    const pledge = pledge_input[idx].getAttribute("min")
    elem.onclick = () => {
      a = true;
      test2(idx, `${pledge}`)
    };
  })
  stedown.forEach((elem, idx) => {
    const pledge = pledge_input[idx].getAttribute("min")
    elem.onclick = () => {
      a = true
      test2(idx, `-${pledge}`)
    };
  })
  pledge_input.forEach(elem => {
    elem.onchange = myFunction
  });

}
let isBookmarked = false;
btn_bookmark.onclick = () => {
  isBookmarked = !isBookmarked;
  let backgroundColor = isBookmarked ? "#E2EFF1" : "#FAFAFA"
  let imageSrc = isBookmarked ? "./images/icon-bookmark-active.svg" : "./images/icon-bookmark.svg"
  let color = isBookmarked ? "hsl(176, 72%, 28%)" : "hsl(0, 0%, 48%)"
  btn_bookmark.style.backgroundColor = backgroundColor
  btn_bookmark.firstElementChild.src = imageSrc
  btn_bookmark.lastElementChild.style.color = color
}

window.onscroll = (event) => {
  let height_navbar = Number(navbar.offsetHeight)
  let height_navbar_mobile = Number(navbar.offsetHeight)
  let scrollY = Number(window.scrollY.toFixed());
  if ((scrollY > height_navbar) || scrollY > height_navbar_mobile) {
    navbar.style.background = "#2F2F2F"
    navbar_mobile.style.background = "#2F2F2F"
  } else {
    navbar.style.background = "none"
    navbar_mobile.style.background = "none"
  }
}
const showData = () => {
  currentReward.forEach((x, idx) => {
    let { rewardHeader, pledge, rewardDescription, stock } = x
    const div = document.createElement("div");
    div.innerHTML =
      `
          <div class="reward ${stock === 0 ? "position-relative" : ""}">
                <div class="flex-between flex-column-mb reward-header">
                  <span style="color:${stock === 0 ? "#9F9F9F" : ""};">
                    ${rewardHeader}
                  </span>
                  <span style="color:${stock === 0 ? "#C3E8E2" : ""};">
                    Pledge $${pledge} or more
                  </span>
                </div>
                <div class="${stock === 0 ? "bg-transparent" : ""}"></div>
                <span>
                  ${rewardDescription}
                </span>
                <div class="flex-between-items-center flex-between-items-start-mb flex-column-mb reward-footer">
                  <div class="flex-between-items-center h-100">
                    <span style="font-size: 28px;color: ${stock === 0 ? "#7F7F7F" : "black"};font-weight: 700;">${stock}</span>
                    <span style="color: ${stock === 0 ? "#7F7F7F" : "#808080"};margin-left: 8px;">left</span>
                  </div>
                  <button>
                    Select Reward
                  </button>
                </div>
              </div>
          `
    reward_parent.appendChild(div)
  })
}
showData()