export class Animal {
  id: string = ''
  type: string = ''
  name: string = ''
  shortDescription: string = ''
  description: string = ''
  image: string = ''
  sex: 'M' | 'F' = 'M'
  age: number | null = null
  vaccinated: boolean = false

  imageStyle: string = ''
}
