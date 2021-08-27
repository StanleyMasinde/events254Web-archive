module.exports = {
  apps: [{
    name: 'Events254 client',
    script: 'npm',
    args: '-- run start',
    watch: false,
    exec_mode: 'cluster',
    instances: 1
  }
  ]
}
