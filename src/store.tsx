import create from 'zustand';

type Store = {
  records: {
    name: string;
    amount: number;
    history: {
      amount: number;
      change: string;
    }[];
  }[];
  addPerson: (name: string, amount: number, change: string) => void;
  updatePerson: (name: string, amount: number, change: string) => void;
};

export const useStore = create<Store>(set => ({
  records: [],

  addPerson: (name, amount, change) => {
    const submitAmount = change === 'inc' ? amount : -amount;
    const person = {
      name,
      amount: submitAmount,
      history: [{ amount, change }],
    };

    set(state => ({ records: [...state.records, person] }));
  },

  updatePerson: (name, amount, change) => {
    set(state => ({
      records: state.records.map(record => {
        if (record.name === name) {
          return {
            ...record,
            amount:
              change === 'inc'
                ? Number(record.amount * 100) + Number(amount * 100)
                : (Number(record.amount * 100) - Number(amount * 100)) / 100,
            history: [...record.history, { amount, change }],
          };
        }

        return record;
      }),
    }));
    // const person = state.records.find(record => record.name === name);
    // if (person) {
    //   person.history = [...person.history, { amount, change }];
    //   const currentAmount = person.amount * 100;
    //   const changeAmount = amount * 100;
    //   const newAmount =
    //     change === 'inc'
    //       ? (currentAmount + changeAmount) / 100
    //       : (currentAmount - changeAmount) / 100;
    //   person.amount = newAmount;
    // }
  },
}));
