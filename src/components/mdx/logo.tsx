import { IconCheck, IconCopy } from '@tabler/icons-react'
import React from 'react'
import { toast } from 'react-hot-toast'

import { Logo as HongLogo } from '@/components/ui'

type CopyButtonProps = {
  color: 'black' | 'white'
}

const getLogoSVG = (color: string) =>
  `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 1280 1876"><path d="M953.6 851.2L870.4 192C870.4 128 900.267 95.9999 960 95.9999C1019.73 95.9999 1053.87 128 1062.4 192C1111.47 535.467 1140.27 747.733 1148.8 828.8C1159.47 907.733 1176.53 1004.8 1200 1120C1253.33 1380.27 1280 1568 1280 1683.2C1280 1747.2 1248 1779.2 1184 1779.2C1120 1779.2 1088 1747.2 1088 1683.2C1088 1585.07 1079.47 1497.6 1062.4 1420.8C1047.47 1341.87 1033.6 1272.53 1020.8 1212.8C1010.13 1153.07 1002.67 1114.67 998.4 1097.6C896 1176.53 734.933 1216 515.2 1216C534.4 1384.53 544 1508.27 544 1587.2C544 1779.2 458.667 1875.2 288 1875.2C183.467 1875.2 108.8 1811.2 64 1683.2C21.3333 1568 0 1444.27 0 1312C0 1218.13 34.1333 1146.67 102.4 1097.6C172.8 1048.53 240 1024 304 1024C250.667 556.8 224 247.467 224 95.9999C224 32 256 0 320 0C384 0 416 34.1333 416 102.4C416 170.667 420.267 258.133 428.8 364.8C437.333 490.667 454.4 663.467 480 883.2L499.2 1024C635.733 1024 745.6 1006.93 828.8 972.8C912 938.667 953.6 898.133 953.6 851.2ZM192 1331.2C192 1373.87 200.533 1443.2 217.6 1539.2C236.8 1635.2 260.267 1683.2 288 1683.2C317.867 1683.2 336 1676.8 342.4 1664C348.8 1651.2 352 1625.6 352 1587.2L320 1216C285.867 1216 256 1224.53 230.4 1241.6C204.8 1258.67 192 1288.53 192 1331.2Z" fill="${color}"></path></svg>`

const CopyButton = (props: CopyButtonProps) => {
  const { color } = props
  const [isCopied, setCopied] = React.useState(false)

  const onCopy = async () => {
    setCopied(true)

    if (!navigator?.clipboard) {
      toast.error('Access to clipboard rejected!')
    }

    try {
      await navigator.clipboard.writeText(getLogoSVG(color))
      toast.success('Copied')
    } catch {
      toast.error('Failed to copy!')
    }
  }

  React.useEffect(() => {
    if (!isCopied) return

    const timerId = setTimeout(() => {
      setCopied(false)
    }, 2000)

    return () => {
      clearTimeout(timerId)
    }
  }, [isCopied])

  return (
    <button
      className='absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-md border bg-background opacity-0 transition [div:hover>&]:opacity-100'
      onClick={onCopy}
      type='button'
      aria-label='Copy code to clipboard'
    >
      {isCopied ? <IconCheck size={16} /> : <IconCopy size={16} />}
    </button>
  )
}

const Logo = () => {
  return (
    <div className='flex flex-col gap-4 md:flex-row'>
      <div className='relative flex h-52 w-full items-center justify-center rounded-lg border bg-white'>
        <CopyButton color='black' />
        <HongLogo className='text-black' width={48} height={48} />
      </div>
      <div className='relative flex h-52 w-full items-center justify-center rounded-lg border bg-black'>
        <CopyButton color='white' />
        <HongLogo width={48} height={48} />
      </div>
    </div>
  )
}

export default Logo
