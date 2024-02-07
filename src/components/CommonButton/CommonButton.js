import { Pressable, View, StyleSheet, Text } from 'react-native';
import { GlobalStyles } from '../../AppStyles';

function CommonButton({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.buttonContainer, mode === 'flat' && styles.flat]}>
          <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default CommonButton;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 8,
    margin: 8,
    borderRadius: 4,
    backgroundColor: GlobalStyles.colors.primary500
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4
  },
  flat: {
    backgroundColor: 'transparent'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  flatText: {
    color: GlobalStyles.colors.primary200
  }
});
