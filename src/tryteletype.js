import {TeletypeClient} from '@atom/teletype-client'


export default class {
  
  constructor(pusherKey, pusherCluster, baseURL) {
    this.pusherKey = pusherKey;
    this.pusherCluster = pusherCluster;
    this.baseURL = baseURL;
  }
  
  run() {
      
      const client = new TeletypeClient({
        pusherKey: this.pusherKey,
        pusherOptions: {
          cluster:  this.pusherCluster,
        },
        baseURL: this.baseURL
      })

      let error
      try {
        client.initialize()
      } catch (e) {
        error = e
      }
      
  }
  
};