import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F3FCFD',
  },

  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  divider: {
    height: 2,
    width: '100%',
    backgroundColor: '#AEC5C2',
    marginVertical: 2,
    borderRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#656B6E',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D2FAF1',
  },
  activeCategory: {
    backgroundColor: '#6FE3D9',
    borderBottomWidth: 0
  },
  categoryButtonText: {
    color: '#333',
  },
  notesList: {
    flex: 1,
    marginBottom: 90,
  },

  removeText: {
    color: '#ff4444',
    fontSize: 18,
  },
  keyboardAvoidingViewContainer: {
    flex: 1
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: '#F3FCFD',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderColor: '#a5e6e6',
    borderWidth: 1,
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  circleButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#a5e6e6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    backgroundColor: '#ffffff',
  },

  circleButtonText: {
    fontSize: 24,
    color: '#000',
    lineHeight: 24,
  },

  categorySquare: {
    width: 16,
    height: 16,
    backgroundColor: '#50b4b4',
    borderRadius: 3,
    marginRight: 12,
  },

  noteText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  selectButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  selectedNoteItem: {
    backgroundColor: '#e0e0e0',
  },
  selectedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#007AFF',
  },
  selectionModeActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelButton: {
    marginRight: 15,
    padding: 5,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3B30',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  deleteButtonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
  },
  selectButton: {
    padding: 5,
  },
  selectionCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    marginHorizontal: 10,
  },
  deleteIcon: {
    marginLeft: 10,
  },
});