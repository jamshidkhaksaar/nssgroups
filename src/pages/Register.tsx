import { Link, useNavigate } from 'react-router'
import { useI18n } from '@/i18n/i18n'
import AuthLayout from '@/components/layout/AuthLayout'
import Reveal from '@/components/Reveal'
import { ClientRegistration } from '@/components/portals/ClientRegistration'
import { usePortalStore } from '@/data/portalData'
import { login } from '@/lib/auth'

export default function Register() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const store = usePortalStore()

  const handleRegisterSubmit = (clientData: Parameters<React.ComponentProps<typeof ClientRegistration>['onRegisterSubmit']>[0]) => {
    const { client } = store.registerClient(clientData)
    login('client', {
      name: client.fullName,
      email: client.email,
      clientId: client.id
    })
    navigate('/client-portal')
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-2xl mx-auto">
        <Reveal>
          <ClientRegistration onRegisterSubmit={handleRegisterSubmit} />
          
          <p className="mt-8 text-center text-sm text-[rgba(var(--text-rgb),0.6)]">
            {t('auth.hasAccount')}{' '}
            <Link to="/login/client" className="font-semibold text-[rgb(var(--gold-rgb))] hover:underline">
              {t('auth.loginLink')}
            </Link>
          </p>
        </Reveal>
      </div>
    </AuthLayout>
  )
}

