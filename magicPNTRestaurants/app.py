from flask import Flask, request, jsonify, render_template, make_response
from firebase_admin import credentials, firestore, initialize_app
import os
import time

app = Flask(__name__)

# Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred)
db = firestore.client()
rest_ref = db.collection('restaurants')

# Index
@app.route('/')
def index():
    return render_template('index.html')

# Add restaurants to DB
@app.route('/add', methods=['POST'])
def create():
    try:
        id = request.json['id']
        rest_ref.document(id).set(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

# Read restaurants from DB
@app.route('/list', methods=['GET'])
def read():
    try:
        # Check if ID was passed to URL query
        rest_id = request.args.get('id')    
        if rest_id:
            rest = rest_ref.document(rest_id).get()
            return jsonify(rest.to_dict()), 200
        else:
            all_rest = [doc.to_dict() for doc in rest_ref.stream()]
            return jsonify(all_rest), 200
    except Exception as e:
        return f"An Error Occured: {e}"

# Update restaurants in DB
@app.route('/update', methods=['POST', 'PUT'])
def update():
    try:
        id = request.json['id']
        rest_ref.document(id).update(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

# Delete restaurants from DB
@app.route('/delete', methods=['GET', 'DELETE'])
def delete():
    try:
        # Check for ID in URL query
        rest_id = request.args.get('id')
        rest_ref.document(rest_id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

# Run Flask App in localhost at port 8080
if __name__ == '__main__':
  app.run(debug=True,host='0.0.0.0',port=int(os.environ.get('PORT', 8080)))
