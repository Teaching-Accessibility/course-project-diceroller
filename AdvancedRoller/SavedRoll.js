import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const Seperator = () => (
  <View style={{height: '100%', borderWidth: 0.5}}></View>
);

export default function SavedRoll({name, dice}) {
  return (
    <View style={{marginVertical: 8}}>
      <TouchableOpacity
        style={{
          borderRadius: 8,
          borderWidth: 2,
          padding: 6,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 28, includeFontPadding: false}}>{name}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '100%',
          }}>
          {typeof dice === 'string' ? (
            <Text style={{fontSize: 20}}>{dice}</Text>
          ) : (
            dice.map((die, idx) => (
              <>
                <Text key={idx} style={{fontSize: 20}}>
                  {die}
                </Text>
                {idx !== dice.length - 1 && <Seperator />}
              </>
            ))
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
