    // src/components/ButtonComponent.tsx
    import React from 'react';
    import { Button } from 'react-native-paper';
    
    interface ButtonComponentProps {
      title: string;
      onPress: () => void;
    }
    
    const ButtonComponent: React.FC<ButtonComponentProps> = ({ title, onPress }) => (
      <Button mode="contained" onPress={onPress}>
        {title}
      </Button>
    );
    
    export default ButtonComponent;


