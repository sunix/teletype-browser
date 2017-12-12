import {TeletypeClient} from '@atom/teletype-client'
const FakeBufferDelegate = require('./fake-buffer-delegate')
const FakeEditorDelegate = require('./fake-editor-delegate')
const FakePortalDelegate = require('./fake-portal-delegate')

export default class {
  
  constructor (options) {
    const {
      pusherKey, pusherOptions, baseURL
    } = options

    this.pusherKey = pusherKey
    this.pusherOptions = pusherOptions
    this.baseURL = baseURL
    this.client = new TeletypeClient({
      pusherKey: this.pusherKey,
      pusherOptions: this.pusherOptions,
      baseURL: this.baseURL
    });
  }

 createClient() {
    return new TeletypeClient({
      pusherKey: this.pusherKey,
      pusherOptions: this.pusherOptions,
      baseURL: this.baseURL
    });
 }
 
 static createPortalBinding(){
     return new FakePortalDelegate()
 }

 static createBufferBinding(){
     return new FakeBufferDelegate()
 }
 
  static createEditorBinding(){
     return new FakeEditorDelegate()
 }
  
 async connect(token, portalId) {
        console.log('token: :' + token);
        console.log('portalId :' + portalId);

        await this.client.signIn(token)
        await this.client.initialize()
        const guestPortalDelegate = new FakePortalDelegate()
        const guestPortal =  await this.client.joinPortal(portalId);
        guestPortal.setDelegate(guestPortalDelegate)
        console.log("activebufferproxyuri : " + guestPortalDelegate.getTetherBufferProxyURI())

        const guestEditorProxy = guestPortalDelegate.getTetherEditorProxy()

        const guestBufferProxy = guestEditorProxy.bufferProxy

        const guestBufferDelegate = new FakeBufferDelegate()
        guestBufferProxy.setDelegate(guestBufferDelegate)

        guestBufferProxy.setTextInRange(...guestBufferDelegate.insert({row: 0, column: 0},'hello from a browser\n'))

  }
};