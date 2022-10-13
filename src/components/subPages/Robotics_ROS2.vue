<template>
  <div class="info">
    <div class="info">
      <h1>General Tips:</h1>
      <p>You save yourself soo much trouble just working with Ubuntu and not in some shell or trying to make it work on another OS.
        It’s possible but I ran into a lot of trouble that I fixed by switching to Ubuntu.</p>
      <p><a href="https://docs.ros.org/en/foxy/Concepts/About-Domain-ID.html">ROS2_DOMAIN_ID</a> Set to be able to communicate between Ros2 packages on a subdomain that has multiple ROS2 packages communicating without them interfering with each other.</p>
      <h1>ROS2</h1>
    </div>

    <div class="info">
      <h3>Install ROS2:</h3>

      <p>Depending on the Ubuntu version:</p>
      <p><a href="https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html">ROS 2 Humble Hawksbill</a> : Ubuntu 22.04</p>
      <p><a href="https://docs.ros.org/en/galactic/Installation/Ubuntu-Install-Debians.html">ROS 2 Galactic</a> : Ubuntu 20.04</p>
      <p><a href="https://docs.ros.org/en/foxy/Installation/Ubuntu-Install-Debians.html">ROS 2 Foxy</a> : Ubuntu 20.04</p>
      <p>ROS 2 Dashing : Ubuntu 18.04</p>
      <p>Make sure you do all the steps in the above link before continuing.</p>

      <p>Check if everything went well by running:</p>
      <p><code> $ source /opt/ros/humble/setup.bash </code></p>
      <p><code> $ ros2 </code></p>
      <p>This should return the help overview of Ros2.</p>
      <p>On Opening a new terminal, before running ROS2 or any packages make sure you run the setup file:</p>
      <p><code> $ source /opt/ros/humble/setup.bash </code></p>
      <p>Make sure the setup.{shell} is your current shell. To check what shell you use run the following:</p>
      <p><code> $ echo $SHELL </code></p>
      <p>Whenever you run into: </p>
      <p><code>ros2: command not found</code></p>
      <p>Make sure you run the setup file.</p>
      <p><code>$ source /opt/ros/humble/setup.bash</code></p>
      <p>If you work a lot with Ros2, it’s a good idea to put it into your ~/.bashrc file</p>
    </div>
    <div class="info">
      <h3>How to create a new ROS2 package</h3>
      <p><a href="Example: https://github.com/JvanderKaaij/Simple_ROS_Unity">Example</a></p>
      <p>Install colcon:</p>
      <p><code>$ sudo sh -c 'echo "deb [arch=amd64,arm64] http://repo.ros2.org/ubuntu/main `lsb_release -cs` main" > /etc/apt/sources.list.d/ros2-latest.list'</code></p>
      <p><code>$ curl -s https://raw.githubusercontent.com/ros/rosdistro/master/ros.asc | sudo apt-key add -</code></p>
      <p><code>$ sudo apt update</code></p>
      <p><code>$ sudo apt install python3-colcon-common-extensions</code></p>
      <p>To create a new package initially:</p>
      <p><code>$ ros2 pkg create --build-type ament_python [name]</code></p>
      <p>This will create a lot of files for you initially.</p>
      <p>You write your custom python code; classes deriving from the Node parent class:</p>
      <p><code>class MinimalPublisher(Node):</code></p>
      <p>Add dependencies to the <u>package.xml</u></p>
      <p>Add entry point into the <u>setup.py:</u></p>
      <p><code>entry_points={
        'console_scripts': [
        'talker = py_pubsub.publisher_member_function:main',
        ],
        },
      </code></p>
      <p>And run the Node depending on the entry points:</p>
      <p><code>$ ros2 run py_pubsub talker</code></p>
    </div>

  </div>
</template>

<script>
export default {
  name: "Robotics",
  mounted(){
  },
  data:function(){
    return {

    }
  },
  components: {},
  methods:{

  }
}
</script>

<style scoped>
ul{
  background-color: #4b3b7a;
  color: #ded6d2;
  padding:20px 40px;
  list-style-type: none;

}

a{
  color: hotpink;
}

p
{
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 10px;
}

code{
  background-color: #110404;
}

.logo{
  padding-bottom: 64px;
}

.info{
  background-color: #372f56;
  text-align: left;
}

h1{
  padding-top:30px;
  padding-bottom:30px;
}

h2{
  padding-top:30px;
  padding-bottom:10px;
}

</style>