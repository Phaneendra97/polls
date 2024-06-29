// import * as React from 'react';
// import { Provider as PaperProvider } from 'react-native-paper';
// import { SafeAreaView, StyleSheet } from 'react-native';
// import { Button, Card, Title, Paragraph } from 'react-native-paper';

// export default function App() {
//   return (
//     <PaperProvider>
//       <SafeAreaView style={styles.container}>
//         <Card>
//           <Card.Content>
//             <Title>React Native Paper</Title>
//             <Paragraph>Your app using React Native Paper</Paragraph>
//           </Card.Content>
//           <Card.Actions>
//             <Button>Ok</Button>
//           </Card.Actions>
//         </Card>
//       </SafeAreaView>
//     </PaperProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
// });


import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
  },
};
