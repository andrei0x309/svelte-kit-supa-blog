<div class="load-line"></div>
<div class="nav-spinner spinner__1"></div>


<style scoped>

.nav-spinner {
  position: fixed;
  transform: translateX(50vw);
  z-index: 1;
}

.nav-spinner:after,
.nav-spinner:before {
  content: "";
  display: block;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
}

.spinner__1::after {
  position: absolute;
  border: 0.6rem solid transparent;
  border-top-color: #2a2a2a;
  border-bottom-color: #2a2a2a;
  top: 20.5vh;
  left: -2rem;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
  z-index: 1;
}
.spinner__1::before {
  position: absolute;
  top: 25vh;
  left: 1rem;
  height: 4rem;
  width: 4rem;
  background-color: #fcb900;
  -webkit-animation: shrink 3s ease infinite;
  animation: shrink 3s ease infinite;
  z-index: 1;
}

@keyframes spin {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.4);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}
@keyframes shrink {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.6);
  }
  100% {
    transform: scale(1);
  }
}

.load-line,
.load-line:before {
  height: 0.6rem;
  width: 100%;
  margin: 0;
}
.load-line {
  background-color: #1c1c1c;
  display: -webkit-flex;
  display: flex;
}
.load-line:before {
  background-color: #d1971f;
  content: "";
  -webkit-animation: running-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  animation: running-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
@-webkit-keyframes running-progress {
  0% {
    margin-left: 0px;
    margin-right: 100%;
  }
  50% {
    margin-left: 25%;
    margin-right: 0%;
  }
  100% {
    margin-left: 100%;
    margin-right: 0;
  }
}
@keyframes running-progress {
  0% {
    margin-left: 0px;
    margin-right: 100%;
  }
  50% {
    margin-left: 25%;
    margin-right: 0%;
  }
  100% {
    margin-left: 100%;
    margin-right: 0;
  }
}

</style>
