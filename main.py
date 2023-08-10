from flask import Flask, request, send_file, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/newinvoice')
def newinvoice():
    return render_template('newinvoice.html')

@app.route('/submitnewclient')
def submitnewclient():
    pass

@app.route('/updateclientdetails')
def updateclientdetails():
    pass

@app.route('/newclient')
def newclient():
    return render_template('newclient.html')

@app.route('/updateclient')
def updateclient():
    return render_template('updateclient.html')

if __name__ == '__main__':
    app.run(debug=True)

