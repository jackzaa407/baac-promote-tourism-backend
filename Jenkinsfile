// node {
//   stage('SCM') {
//     git 'https://github.com/jackzaa407/baac-promote-tourism-backend.git'
//   }
//   stage('Sonarqube') {
//     environment {
//         scannerHome = tool 'SonarQubeScanner'
//     }
//     steps {
//         withSonarQubeEnv('sonarqube') {
//             sh "${scannerHome}/bin/sonar-scanner"
//         }
//         timeout(time: 10, unit: 'MINUTES') {
//             waitForQualityGate abortPipeline: true
//         }
//     }
// }
// }

node('docker') {
  stage('SCM') {
    checkout poll: false, scm: [$class: 'GitSCM', branches: [[name: 'refs/heads/develop']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/jackzaa407/baac-promote-tourism-backend.git']]]
  }
  stage('SonarQube Analysis') {
        sh "/home/jenkins/tools/hudson.plugins.sonar.SonarRunnerInstallation/sonarqubescanner/bin/sonar-scanner -Dsonar.host.url=http://192.168.1.250:9000 -Dsonar.projectName=meanstackapp -Dsonar.projectVersion=1.0 -Dsonar.projectKey=meanstack:app -Dsonar.sources=. -Dsonar.projectBaseDir=/home/jenkins/workspace/sonarqube_test_pipeline"
    }
  }