import 'dart:convert';

import 'package:http/http.dart' as http;

const apiUrl = 'http://localhost:8000/api/notes/';
const headers = {
  'Content-Type': 'application/json',
  'Accept': "application/json",
};

dynamic getNotes() {
  return http.get(Uri.parse(apiUrl)).then((value) {
    return jsonDecode(value.body);
  });
}

Future<http.Response> createNotes(params) {
  return http.post(Uri.parse(apiUrl), body: params);
}
