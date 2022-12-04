import { ICharacter } from '@/interfaces/character.interface';
export const adapterCharacters = (characters: []): ICharacter[] => {
    return characters.map((itemCharacter: any) => {
      let character: ICharacter = {
        id: itemCharacter.id,
        name: itemCharacter.name,
        status: itemCharacter.status,
        species: itemCharacter.species,
        type: itemCharacter.type,
        created: itemCharacter.created,
        gender: itemCharacter.gender,
        image: itemCharacter.image,
        location: itemCharacter.location.name,
        star: false,
      };
      return character;
    });
  };
  