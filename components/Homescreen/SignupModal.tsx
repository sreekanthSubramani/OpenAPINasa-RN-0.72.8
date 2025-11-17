import { View, StyleSheet, Text, Modal } from 'react-native'
import { useSelector } from 'react-redux'
import type { Rootstate } from '../../Redux/Store/StoreConfig'

export default function SignupModal(): JSX.Element {

  const modalOpen = useSelector((state: Rootstate) => state.modal.isOpen)

  return (
    <Modal
      visible={modalOpen}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text>Test</Text>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",   // dim background
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  modalBox: {
    height: 300,          // CUSTOM HEIGHT
    width: "100%",         // CUSTOM WIDTH
    borderRadius: 20,
    backgroundColor: "white",
    padding: 20,
  },
})
