# Simple WebRTC client


#### Installation

Install the bower components:

```
bower install
```

Install the PeerJS server:

```
npm install -g peer
```

Configure and run the server:

```
peerjs --port 56000 --key peerjs --debug
```

Run a web server on port 3000 and open [http://localhost:3000]()

Open the demo clients in separate browsers.

Note: To test the clients in Chrome via MaC OS terminal, add the following line to your ```.bash_profile```. 
```bash
alias chrome-webrtc='/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --use-fake-ui-for-media-stream --use-fake-device-for-media-stream'
```
