import React, { useState, useRef, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from "./styles/styles";
import { Category, Note } from "./types/types";
import { NoteService } from "../services/noteService";

export default function QuickNoteApp() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    Category.Work
  );
  const [inputText, setInputText] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedNotes, setSelectedNotes] = useState<number[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);

  const noteServiceRef = useRef<NoteService | null>(null);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    noteServiceRef.current = new NoteService();
    setNotes(noteServiceRef.current.getAllNotes());

    return () => {
      noteServiceRef.current?.close();
    };
  }, []);

  const handleAddNote = (): void => {
    if (!inputText.trim() || !noteServiceRef.current) return;

    if (editingId !== null) {
      noteServiceRef.current.updateNote(editingId, {
        text: inputText.trim(),
        category: selectedCategory,
      });
      setEditingId(null);
    } else {
      const newNote: Note = {
        _id: Date.now(),
        text: inputText.trim(),
        category: selectedCategory,
      };
      noteServiceRef.current.addNote(newNote);
    }

    setNotes(noteServiceRef.current.getAllNotes());
    setInputText("");
    Keyboard.dismiss();
  };

  const handleRemoveNote = (_id: number): void => {
    if (!noteServiceRef.current) return;
    noteServiceRef.current.removeNote(_id);
    setNotes(noteServiceRef.current.getAllNotes());
  };

  const handleRemoveSelectedNotes = (): void => {
    if (!noteServiceRef.current || selectedNotes.length === 0) return;

    selectedNotes.forEach((id) => {
      noteServiceRef.current?.removeNote(id);
    });

    setNotes(noteServiceRef.current.getAllNotes());
    setSelectedNotes([]);
    setIsSelectMode(false);
  };

  const handleEditNote = (id: number): void => {
    if (isSelectMode) {
      toggleNoteSelection(id);
      return;
    }

    const noteToEdit = notes.find((n) => n._id === id);
    if (noteToEdit) {
      setInputText(noteToEdit.text);
      setSelectedCategory(noteToEdit.category);
      setEditingId(noteToEdit._id);
      inputRef.current?.focus();
    }
  };

  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    if (!isSelectMode) {
      setSelectedNotes([]);
    }
  };

  const toggleNoteSelection = (id: number) => {
    setSelectedNotes((prev) =>
      prev.includes(id) ? prev.filter((noteId) => noteId !== id) : [...prev, id]
    );
  };

  const longPressTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleLongPress = (id: number) => {
    setIsSelectMode(true);
    toggleNoteSelection(id);
  };

  const handlePressIn = (id: number) => {
    longPressTimeout.current = setTimeout(() => {
      handleLongPress(id);
    }, 400);
  };

  const handlePressOut = () => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
    }
  };

  const cancelSelection = () => {
    setIsSelectMode(false);
    setSelectedNotes([]);
  };

  const renderNote = ({ item }: { item: Note }) => (
    <TouchableOpacity
      onPress={() => handleEditNote(item._id)}
      onPressIn={() => handlePressIn(item._id)}
      onPressOut={handlePressOut}
      style={[
        styles.noteItem,
        isSelectMode &&
          selectedNotes.includes(item._id) &&
          styles.selectedNoteItem,
      ]}
    >
      {isSelectMode && (
        <View style={styles.selectionCircle}>
          {selectedNotes.includes(item._id) && (
            <Icon name="check" size={16} color="#007AFF" />
          )}
        </View>
      )}
      <View style={styles.categorySquare} />
      <Animatable.Text
        animation="zoomIn"
        duration={500}
        style={styles.noteText}
      >
        {item.text}
      </Animatable.Text>

      {!isSelectMode && (
        <>
          <TouchableOpacity onPress={() => handleEditNote(item._id)}>
            <Icon name="edit" size={24} color="#666" style={styles.editIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRemoveNote(item._id)}>
            <Icon
              name="delete"
              size={24}
              color="#FF3B30"
              style={styles.deleteIcon}
            />
          </TouchableOpacity>
        </>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>Quick Note</Text>
              {isSelectMode ? (
                <View style={styles.selectionModeActions}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={cancelSelection}
                  >
                    <Icon name="close" size={20} color="#666" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleRemoveSelectedNotes}
                  >
                    <Icon name="delete" size={20} color="white" />
                    <Text style={styles.deleteButtonText}>
                      {selectedNotes.length}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={toggleSelectMode}
                >
                  <Icon name="view-list" size={20} color="#007AFF" />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.divider} />
            <Text style={styles.subtitle}>What will you achieve today?</Text>

            <View style={styles.categoryContainer}>
              {Object.values(Category).map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryButton,
                    selectedCategory === cat && styles.activeCategory,
                  ]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text style={styles.categoryButtonText}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <FlatList
              data={notes.filter((note) => note.category === selectedCategory)}
              keyExtractor={(item) => item._id.toString()}
              renderItem={renderNote}
              style={styles.notesList}
              contentContainerStyle={{ paddingBottom: 80 }}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No notes yet</Text>
              }
              keyboardShouldPersistTaps="handled"
            />

            {!isSelectMode && (
              <View style={styles.inputContainer}>
                <TextInput
                  ref={inputRef}
                  style={styles.input}
                  placeholder="Drop a thought..."
                  value={inputText}
                  onChangeText={setInputText}
                  onSubmitEditing={handleAddNote}
                />
                <TouchableOpacity
                  style={styles.circleButton}
                  onPress={handleAddNote}
                >
                  <Text style={styles.circleButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
