<template>
  <div class="form">
    <div class="form-toggle"></div>
    <div class="form-panel one">
      <div class="form-header">
        <h1>회원가입 페이지 입니다</h1>
      </div>
      <div class="form-content">
        <form>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required="required"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required="required"
            />
          </div>
          <div class="form-group">
            <label for="cpassword">Confirm Password</label>
            <input
              type="password"
              id="cpassword"
              name="cpassword"
              required="required"
            />
          </div>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" required="required" />
          </div>
          <div class="form-group">
            <button type="submit">Register</button>
          </div>
          <div class="form-group">
            <button type="submit">
              <router-link to="/login">Cancle</router-link>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  date() {
    return {};
  }
};
</script>

<style scoped>
.form {
  z-index: 10;
  position: relative;
  background: #ffffff;
  width: 600px;
  border-radius: 4px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: auto;
  top: 150px;
  margin-bottom: 300px;
}
.form-toggle {
  z-index: 10;
  position: absolute;
  top: 60px;
  right: 60px;
  background: #ffffff;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  transform-origin: center;
  transform: translate(0, -25%) scale(0);
  opacity: 0;
  cursor: pointer;
  transition: all 0.3s ease;
}
.form-toggle:before,
.form-toggle:after {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 4px;
  background: #7bc4c4;
  transform: translate(-50%, -50%);
}
.form-toggle:before {
  transform: translate(-50%, -50%) rotate(45deg);
}
.form-toggle:after {
  transform: translate(-50%, -50%) rotate(-45deg);
}
.form-toggle.visible {
  transform: translate(0, -25%) scale(1);
  opacity: 1;
}
.form-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 0 20px;
}
.form-group:last-child {
  margin: 0;
}
.form-group label {
  display: block;
  margin: 0 0 10px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.2em;
}
.two .form-group label {
  color: #ffffff;
}
.form-group input {
  outline: none;
  display: block;
  background: rgba(0, 0, 0, 0.1);
  width: 100%;
  border: 0;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 12px 20px;
  color: rgba(0, 0, 0, 0.6);
  font-family: inherit;
  font-size: inherit;
  font-weight: 500;
  line-height: inherit;
  transition: 0.3s ease;
}
.form-group input:focus {
  color: rgba(0, 0, 0, 0.8);
}
.two .form-group input {
  color: #ffffff;
}
.two .form-group input:focus {
  color: #ffffff;
}
.form-group button {
  outline: none;
  background: #7bc4c4;
  width: 100%;
  border: 0;
  border-radius: 4px;
  padding: 12px 20px;
  color: #ffffff;
  font-family: inherit;
  font-size: inherit;
  font-weight: 500;
  line-height: inherit;
  text-transform: uppercase;
  cursor: pointer;
}
.form-group button a {
  text-decoration: none;
  color: #ffffff;
}
.two .form-group button {
  background: #ffffff;
  color: #7bc4c4;
}
.form-group .form-remember {
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  text-transform: none;
}
.form-group .form-remember input[type="checkbox"] {
  display: inline-block;
  width: auto;
  margin: 0 10px 0 0;
}
.form-group .form-recovery {
  color: #2e2e2e;
  font-size: 12px;
  text-decoration: none;
}
.form-panel {
  padding: 60px calc(5% + 60px) 60px 60px;
  box-sizing: border-box;
}
.form-header {
  margin: 0 0 40px;
}
.form-header h1 {
  padding: 4px 0;
  color: #7bc4c4;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
}
</style>
