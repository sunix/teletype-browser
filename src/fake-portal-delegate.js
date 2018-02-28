
const assert = require('assert')

module.exports =
class FakePortalDelegate {
  constructor () {
    this.hostClosedPortal = false
    this.hostLostConnection = false
    this.joinEvents = []
    this.leaveEvents = []
    this.editorProxies = new Set()
    this.tetherEditorProxyChangeCount = 0
    this.tetherPosition = null
    this.activePositionsBySiteId = {}
  }

  dispose () {
    this.disposed = true
  }

  isDisposed () {
    return this.disposed
  }

  hostDidClosePortal () {
    this.hostClosedPortal = true
  }

  hasHostClosedPortal () {
    return this.hostClosedPortal
  }

  hostDidLoseConnection () {
    this.hostLostConnection = true
  }

  hasHostLostConnection () {
    return this.hostLostConnection
  }

  addEditorProxy (editorProxy) {
    if (typeof this.onAddEditorProxy === "function") { 
      this.onAddEditorProxy(editorProxy)
    }
    console.log("addEditorProxy: " + editorProxy.bufferProxy.uri);
    assert(!this.editorProxies.has(editorProxy), 'Cannot add the same editor proxy multiple times')
    this.editorProxies.add(editorProxy)
  }

  removeEditorProxy (editorProxy) {
    if (typeof this.onRemoveEditorProxy === "function") { 
      this.onRemoveEditorProxy(editorProxy)
    }
    assert(this.editorProxies.has(editorProxy), 'Can only remove editor proxies that had previously been added')
    this.editorProxies.delete(editorProxy)
    if (this.tetherEditorProxy == editorProxy) {
      this.tetherEditorProxy = null
      this.tetherEditorProxyChangeCount++
    }
  }

  editorProxyForURI (uri) {
    return Array.from(this.editorProxies).find((e) => e.bufferProxy.uri === uri)
  }

  getTetherEditorProxy () {
    return this.tetherEditorProxy
  }

  getTetherBufferProxyURI () {
    return (this.tetherEditorProxy) ? this.tetherEditorProxy.bufferProxy.uri : null
  }

  getEditorProxies () {
    return Array.from(this.editorProxies)
  }

  updateTether (state, editorProxy, position) {
    if (typeof this.onUpdateTether === "function") { 
      this.onUpdateTether(state, editorProxy, position)
    }
    console.log("updateTether: " + editorProxy.bufferProxy.uri);
    this.tetherState = state
    if (editorProxy != this.tetherEditorProxy) {
      this.tetherEditorProxy = editorProxy
      this.tetherEditorProxyChangeCount++
    }
    this.tetherPosition = position
  }

  getTetherState () {
    return this.tetherState
  }

  getTetherPosition () {
    return this.tetherPosition
  }

  updateActivePositions (positionsBySiteId) {
       this.doUpdateActivePositions(positionsBySiteId);

//      console.log("Update active positions");
//      for (let siteId in positionsBySiteId) {
//         siteId = parseInt(siteId)
//         this.doUpdateActivePosition(positionsBySiteId[siteId])
//      }
  }

  siteDidJoin (siteId) {
    this.joinEvents.push(siteId)
  }

  siteDidLeave (siteId) {
    this.leaveEvents.push(siteId)
  }
}