export interface LoanData {
  id: string;
  loanNo: string;
  loanType: string;
  borrower: string;
  borrowerAddress: string;
  coBorrowerName: string;
  coBorrowerAddress: string;
  currentDPD: number;
  sanctionAmount: number;
  region: string;
  status: string;
}

export const mockLoans: LoanData[] = [
  {
    id: '1',
    loanNo: 'L28U3247',
    loanType: 'Home Loan',
    borrower: 'Vedika Sekhar',
    borrowerAddress: '83 Yogi Ganj, Kadapa-058770',
    coBorrowerName: 'Divit Vora',
    coBorrowerAddress: '24/543, Acharya Path Ginglee-052360',
    currentDPD: 91,
    sanctionAmount: 1934068,
    region: 'West',
    status: 'U',
  },
  {
    id: '2',
    loanNo: 'L28U3243',
    loanType: 'Car Loan',
    borrower: 'Hrishita Agrawal',
    borrowerAddress: '86/622, Deo Path, Berhampore 841186',
    coBorrowerName: 'Mahika Tak',
    coBorrowerAddress: '58 Telia Road, Sultan Pur Majra 919878',
    currentDPD: 100,
    sanctionAmount: 1842143,
    region: 'North',
    status: 'K',
  },
  {
    id: '3',
    loanNo: 'L28U3250',
    loanType: 'Car Loan',
    borrower: 'Priyansh Soman',
    borrowerAddress: 'H.No. 152 Andra Street Amritsar-47182',
    coBorrowerName: 'Zaina Dara',
    coBorrowerAddress: 'H.No. 42, Srivastava Marg, Junagadh-191124',
    currentDPD: 100,
    sanctionAmount: 4537889,
    region: 'East',
    status: 'T',
  },
];

export const getLoanData = (): Promise<LoanData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockLoans);
    }, 500); // Simulate API delay
  });
}; 