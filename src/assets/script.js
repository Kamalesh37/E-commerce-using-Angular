function Myapp() {

  const fixNav = () => {
    let nav = document.querySelector(".topnav");
    console.log(nav)
    if (window.scrollY > nav.offsetHeight + 10) 
        nav.classList.add("active");
    else 
      nav.classList.remove("active");
  };

  window.addEventListener("scroll", fixNav);
}
