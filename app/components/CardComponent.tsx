// src/components/CardComponent.tsx
import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';

interface CardComponentProps {
  title: string;
  content: string;
}

const CardComponent: React.FC<CardComponentProps> = ({ title, content }) => (
  <Card>
    <Card.Content>
      <Title>{title}</Title>
      <Paragraph>{content}</Paragraph>
    </Card.Content>
  </Card>
);

export default CardComponent;