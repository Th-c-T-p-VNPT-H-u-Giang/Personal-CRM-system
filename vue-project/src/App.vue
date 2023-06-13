<template>
  <div>
    <div id="message-bar">
      <p id="notification"></p>
    </div>
    <form class="container">
      <h2>Send Messages with Socket.io</h2>
      <textarea
        rows="5"
        width="100%"
        name="message"
        id="message"
        placeholder="Enter your message..."
      ></textarea>
      <button @click="printMessage">SEND MESSAGE</button>
    </form>
  </div>
</template>

<script>
export default {

  setup() {

    const printMessage = () => {
      console.log('run');
    }

    return {
      printMessage
    }
  }
}
</script>

<style scoped>
#message-bar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
#notification {
  color: #fff;
}
.container {
  height: 80vh;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
h2 {
  text-align: center;
  margin-bottom: 30px;
}
textarea {
  font-size: 16px;
  margin-bottom: 30px;
  padding: 15px;
  outline: none;
}
button {
  width: 200px;
  padding: 15px;
  cursor: pointer;
  background-color: #2c3639;
  outline: none;
  border: none;
  color: #dcd7c9;
  font-size: 16px;
}
button:hover {
  background-color: #3f4e4f;
}
</style>