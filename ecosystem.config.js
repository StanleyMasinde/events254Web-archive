module.exports = {
  apps: [{
    name: 'events254.co.ke',
    script: 'npm',
    args: '-- run preview',
    watch: false,
    exec_mode: 'cluster',
    instances: 1,
  }
  ]
}
