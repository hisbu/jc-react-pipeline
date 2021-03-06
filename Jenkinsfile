pipeline {
  agent any

  environment {
    // CI = true
    DOCKER_TAG = getDockerTag()
  }

  stages {
    // stage pertama
    stage ('Install Dependencies react project'){
      steps{
        echo "Start install dependencies react project"
        sh "npm install"
      }
    }

    //stage dua
    stage ('Test project') {
      steps{
        echo "run test script"
        // sh 'chmod +x jenkins/scripts/test.sh'
        // sh './jenkins/scripts/test.sh'
      }
    }

    //stage tiga
    stage ('Build react project'){
      steps{
        sh 'npm run build'
      }
    }

    //stage empat
    stage ("build docker images"){
      steps{
        script {
          app = docker.build("hisbu/reactapp-jcde")
        }
      }
    }

    //stage lima
    stage ("test docker image"){
      steps{
        sh 'docker run -d --rm --name testimage -p 8081:80 hisbu/reactapp-jcde'
        // input message: "Finished test image? (Click procced to continue)"
      }
    }

    //stage enam
    stage("clean up docker test"){
      steps{
        sh 'docker stop testimage'
      }
    }

    //stage tujuh
    stage ("push image to registry"){
      steps{
        script{
          docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-hisbu'){
            app.push("${DOCKER_TAG}")
            app.push("latest")
          }
        }
      }
    }

    // stage delapan
    stage("cleanup docker images"){
      steps{
        sh 'docker rmi hisbu/reactapp-jcde'
        // sh "docker rmi registry.hub.docker.com/hisbu/reactapp-jcde:'${DOCKER_TAG}'"
      }
    }

    //stage sembilan
    stage("deploy app to kubernetes cluster"){
      steps{
        sh "chmod +x changeTag.sh"
        sh "./changeTag.sh ${DOCKER_TAG}"
        withKubeConfig([credentialsId: 'kubecconfig-clusterjcde', serverUrl:'https://34.101.207.52']){
          sh 'kubectl apply -f reactapp-config.k8s.yaml'
        }
      }
    }

  }
}

def getDockerTag(){
  def tag = sh script: "git rev-parse HEAD", returnStdout: true
  return tag
}