import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const scheme = useColorScheme(); // "light" or "dark"

  const isDark = scheme === 'dark';
  const theme = {
    background: isDark ? '#121212' : '#f5f5f5',
    card: isDark ? '#1e1e1e' : '#fff',
    text: isDark ? '#f5f5f5' : '#121212',
    placeholder: isDark ? '#aaa' : '#555',
    border: isDark ? '#333' : '#ddd',
    primary: '#4CAF50',
    danger: '#FF5252',
  };

  // Add new todo
  const addTodo = () => {
    if (input.trim() === '') return;
    setTodos([
      ...todos,
      { id: Date.now().toString(), text: input, done: false },
    ]);
    setInput('');
  };

  // Toggle complete/incomplete
  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  // Delete todo
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const renderItem = ({ item }: { item: Todo }) => (
    <View
      style={[
        styles.todoItem,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <TouchableOpacity
        onPress={() => toggleTodo(item.id)}
        style={styles.todoTextWrapper}
      >
        <Text
          style={[
            styles.todoText,
            { color: item.done ? theme.placeholder : theme.text },
            item.done && styles.todoDone,
          ]}
        >
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTodo(item.id)}>
        <Text style={[styles.deleteBtn, { color: theme.danger }]}>❌</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <Text style={[styles.heading, { color: theme.text }]}>📝 Todo App</Text>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Enter a note..."
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                color: theme.text,
                borderColor: theme.border,
                backgroundColor: theme.card,
              },
            ]}
          />
          <TouchableOpacity
            onPress={addTodo}
            style={[styles.addBtn, { backgroundColor: theme.primary }]}
          >
            <Text style={styles.addBtnText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Todo List */}
        <FlatList
          data={todos}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={[styles.empty, { color: theme.placeholder }]}>
              No notes yet
            </Text>
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  addBtn: {
    marginLeft: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    marginVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  todoTextWrapper: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
  },
  todoDone: {
    textDecorationLine: 'line-through',
  },
  deleteBtn: {
    fontSize: 18,
    marginLeft: 10,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
