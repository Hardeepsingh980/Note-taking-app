import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';
import 'package:note_app/apiHelper.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List notes = [];

  @override
  void initState() {
    super.initState();

    getNotesFromAPI();
  }

  getNotesFromAPI() async {
    var response = await getNotes();
    setState(() {
      notes = response;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Note Taking Application')),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          TextEditingController title = TextEditingController();
          TextEditingController content = TextEditingController();
          showDialog(
              context: context,
              builder: (context) {
                return AlertDialog(
                  title: Text('Add Note'),
                  content: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      TextField(
                        controller: title,
                        decoration: InputDecoration(label: Text('Title')),
                      ),
                      TextField(
                        controller: content,
                        decoration: InputDecoration(
                          label: Text('Content'),
                        ),
                      ),
                    ],
                  ),
                  actions: [
                    TextButton(
                        onPressed: () {
                          Navigator.pop(context);
                        },
                        child: Text('Close')),
                    TextButton(
                      child: Text('Save'),
                      onPressed: () async {
                        await createNotes(
                            {'title': title.text, 'content': content.text});
                        Navigator.pop(context);
                        getNotesFromAPI();
                      },
                    )
                  ],
                );
              });
        },
        label: Text('Add Note'),
        icon: Icon(Icons.add),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            ...List.generate(
                notes.length,
                (index) => ListTile(
                      title: Text(notes[index]['title']),
                      subtitle: Text(notes[index]['content']),
                    ))
          ],
        ),
      ),
    );
  }
}
